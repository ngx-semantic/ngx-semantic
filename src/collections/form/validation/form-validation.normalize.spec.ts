import { normalizeFields } from './form-validation.normalize';

describe('normalizeFields', () => {
  it('normalizes shorthand string rules', () => {
    const n = normalizeFields({ email: 'empty' });
    expect(n).toEqual([
      jasmine.objectContaining({
        key: 'email',
        identifier: 'email',
        optional: false,
        rules: [{ type: 'empty' }]
      })
    ]);
  });

  it('normalizes shorthand array rules', () => {
    const n = normalizeFields({ pass: ['empty', 'minLength[6]'] });
    expect(n[0].rules.map(r => r.type)).toEqual(['empty', 'minLength[6]']);
  });

  it('normalizes longhand with identifier, optional, and depends', () => {
    const n = normalizeFields({
      confirm: {
        identifier: 'password2',
        rules: ['match[password]'],
        optional: false,
        depends: 'password'
      }
    });
    expect(n[0]).toEqual(
      jasmine.objectContaining({
        key: 'confirm',
        identifier: 'password2',
        depends: 'password',
        optional: false,
        rules: [{ type: 'match[password]' }]
      })
    );
  });

  it('normalizes object rule entries', () => {
    const n = normalizeFields({
      x: { rules: [{ type: 'email', prompt: 'Bad' }] }
    });
    expect(n[0].rules[0]).toEqual(jasmine.objectContaining({ type: 'email', prompt: 'Bad' }));
  });
});
