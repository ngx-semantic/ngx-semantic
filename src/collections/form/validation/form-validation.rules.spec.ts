import { evaluateRule, parseRuleType } from './form-validation.rules';
import type { SuiFormRuleContext } from './form-validation.model';

function ctx(partial: Partial<SuiFormRuleContext> = {}): SuiFormRuleContext {
  return {
    getFieldValue: () => '',
    getFieldElement: () => null,
    ...partial
  };
}

describe('parseRuleType', () => {
  it('returns name only when no brackets', () => {
    expect(parseRuleType('empty')).toEqual({ name: 'empty' });
  });

  it('parses bracket param', () => {
    expect(parseRuleType('minLength[6]')).toEqual({ name: 'minLength', bracket: '6' });
  });

  it('returns whole string as name when bracket is malformed', () => {
    expect(parseRuleType('bad[')).toEqual({ name: 'bad[' });
  });
});

describe('evaluateRule', () => {
  it('empty requires non-empty value', () => {
    expect(
      evaluateRule({ type: 'empty' }, '', 'f', ctx())
    ).toBe(false);
    expect(
      evaluateRule({ type: 'empty' }, 'x', 'f', ctx())
    ).toBe(true);
  });

  it('email allows empty or valid email', () => {
    expect(evaluateRule({ type: 'email' }, '', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'email' }, 'a@b.co', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'email' }, 'nope', 'f', ctx())).toBe(false);
  });

  it('url allows empty or http(s) URL', () => {
    expect(evaluateRule({ type: 'url' }, '', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'url' }, 'https://a.com', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'url' }, 'not-a-url', 'f', ctx())).toBe(false);
  });

  it('integer enforces range when bracket is a..b', () => {
    expect(evaluateRule({ type: 'integer[1..3]' }, '2', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'integer[1..3]' }, '9', 'f', ctx())).toBe(false);
  });

  it('minLength requires numeric bracket', () => {
    expect(evaluateRule({ type: 'minLength[3]' }, 'abc', 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'minLength[3]' }, 'ab', 'f', ctx())).toBe(false);
    expect(evaluateRule({ type: 'minLength[x]' }, 'ab', 'f', ctx())).toBe(false);
  });

  it('match compares to other field', () => {
    const c = ctx({ getFieldValue: id => (id === 'other' ? 'x' : '') });
    expect(evaluateRule({ type: 'match[other]' }, 'x', 'f', c)).toBe(true);
    expect(evaluateRule({ type: 'match[other]' }, 'y', 'f', c)).toBe(false);
  });

  it('regexp uses rule.value RegExp', () => {
    expect(
      evaluateRule({ type: 'regexp', value: /^\d+$/ }, '12', 'f', ctx())
    ).toBe(true);
    expect(
      evaluateRule({ type: 'regexp', value: /^\d+$/ }, 'ab', 'f', ctx())
    ).toBe(false);
  });

  it('regexp parses /pattern/flags from bracket', () => {
    expect(
      evaluateRule({ type: 'regexp[/^[a-z]+$/]' }, 'abc', 'f', ctx())
    ).toBe(true);
  });

  it('checked requires true', () => {
    expect(evaluateRule({ type: 'checked' }, true, 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'checked' }, false, 'f', ctx())).toBe(false);
  });

  it('creditcard runs luhn and optional type', () => {
    const visa = '4532015112830366';
    expect(evaluateRule({ type: 'creditcard' }, visa, 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'creditcard[visa]' }, visa, 'f', ctx())).toBe(true);
    expect(evaluateRule({ type: 'creditcard' }, '123', 'f', ctx())).toBe(false);
  });

  it('unknown rule type passes', () => {
    expect(evaluateRule({ type: 'customFutureRule' }, 'anything', 'f', ctx())).toBe(true);
  });
});
