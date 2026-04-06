import type { SuiFormRuleContext, SuiFormRuleParseResult, SuiFormValidationRuleSpec } from './form-validation.model';

/** Split `ruleName[param]` (supports nested brackets in regExp by using `value` on rule spec instead). */
export function parseRuleType(type: string): SuiFormRuleParseResult {
  const t = type.trim();
  const open = t.indexOf('[');
  if (open === -1) {
    return { name: t };
  }
  const close = t.lastIndexOf(']');
  if (close <= open) {
    return { name: t };
  }
  return {
    name: t.slice(0, open),
    bracket: t.slice(open + 1, close)
  };
}

function asString(v: unknown): string {
  if (v === null || v === undefined) {
    return '';
  }
  if (Array.isArray(v)) {
    return v.join(',');
  }
  if (typeof v === 'boolean') {
    return v ? 'true' : '';
  }
  return String(v);
}

function isEmptyValue(v: unknown): boolean {
  if (v === null || v === undefined) {
    return true;
  }
  if (typeof v === 'boolean') {
    return !v;
  }
  if (Array.isArray(v)) {
    return v.length === 0;
  }
  return String(v).trim() === '';
}

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function parseIntegerRange(
  bracket: string | undefined
): {min?: number; max?: number} | null {
  if (!bracket) {
    return {};
  }
  const m = /^(-?\d+)\.\.(-?\d+)$/.exec(bracket.trim());
  if (m) {
    return { min: Number(m[1]), max: Number(m[2]) };
  }
  return null;
}

function luhnValid(digits: string): boolean {
  const d = digits.replace(/\D/g, '');
  if (d.length < 13) {
    return false;
  }
  let sum = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d.charAt(i), 10);
    if (alt) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

const CARD_TYPES: Record<string, RegExp> = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  amex: /^3[47][0-9]{13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  unionpay: /^62[0-9]{14,17}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  maestro: /^(?:5[0678]\d{2}|6304|6706|6771|6709)\d{8,15}$/,
  laser: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
  visaElectron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/
};

/**
 * Returns true if the value satisfies the rule.
 */
export function evaluateRule(
  rule: SuiFormValidationRuleSpec,
  fieldValue: unknown,
  fieldIdentifier: string,
  ctx: SuiFormRuleContext
): boolean {
  const { name, bracket } = parseRuleType(rule.type);
  const s = asString(fieldValue);
  const lower = name.toLowerCase();

  switch (lower) {
    case 'empty':
      return !isEmptyValue(fieldValue);
    case 'checked':
      return fieldValue === true;
    case 'email':
      return s === '' || EMAIL_RE.test(s);
    case 'url':
      return s === '' || isValidUrl(s);
    case 'decimal':
      return s === '' || /^-?\d+\.\d+$/.test(s.trim());
    case 'number':
      return s === '' || /^-?\d+(\.\d+)?$/.test(s.trim());
    case 'integer': {
      if (s.trim() === '') {
        return true;
      }
      if (!/^-?\d+$/.test(s.trim())) {
        return false;
      }
      const n = parseInt(s, 10);
      const range = parseIntegerRange(bracket);
      if (range && range.min !== undefined && range.max !== undefined) {
        return n >= range.min && n <= range.max;
      }
      return true;
    }
    case 'regexp': {
      let re: RegExp | null = null;
      if (rule.value instanceof RegExp) {
        re = rule.value;
      } else if (bracket) {
        const inner = bracket.trim();
        const m = inner.match(/^\/(.*)\/([gimuy]*)$/);
        if (m) {
          re = new RegExp(m[1], m[2] || '');
        }
      }
      if (!re) {
        return false;
      }
      return re.test(s);
    }
    case 'minlength': {
      const min = bracket ? parseInt(bracket, 10) : NaN;
      if (Number.isNaN(min)) {
        return false;
      }
      return s.length >= min;
    }
    case 'maxlength': {
      const max = bracket ? parseInt(bracket, 10) : NaN;
      if (Number.isNaN(max)) {
        return false;
      }
      return s.length <= max;
    }
    case 'exactlength': {
      const ex = bracket ? parseInt(bracket, 10) : NaN;
      if (Number.isNaN(ex)) {
        return false;
      }
      return s.length === ex;
    }
    case 'match': {
      if (!bracket) {
        return false;
      }
      const other = asString(ctx.getFieldValue(bracket));
      return s === other;
    }
    case 'different': {
      if (!bracket) {
        return false;
      }
      const other = asString(ctx.getFieldValue(bracket));
      return s !== other || s === '';
    }
    case 'mincount': {
      const min = bracket ? parseInt(bracket, 10) : NaN;
      if (!Number.isFinite(min)) {
        return false;
      }
      const arr = Array.isArray(fieldValue) ? fieldValue : [];
      return arr.length >= min;
    }
    case 'maxcount': {
      const max = bracket ? parseInt(bracket, 10) : NaN;
      if (!Number.isFinite(max)) {
        return false;
      }
      const arr = Array.isArray(fieldValue) ? fieldValue : [];
      return arr.length <= max;
    }
    case 'exactcount': {
      const ex = bracket ? parseInt(bracket, 10) : NaN;
      if (!Number.isFinite(ex)) {
        return false;
      }
      const arr = Array.isArray(fieldValue) ? fieldValue : [];
      return arr.length === ex;
    }
    case 'contains':
      return bracket ? s.toLowerCase().includes(bracket.toLowerCase()) : false;
    case 'containsexactly':
      return bracket ? s.includes(bracket) : false;
    case 'doesntcontain':
      return bracket ? !s.toLowerCase().includes(bracket.toLowerCase()) : false;
    case 'doesntcontainexactly':
      return bracket ? !s.includes(bracket) : false;
    case 'is':
      return bracket ? s.toLowerCase() === bracket.toLowerCase() : false;
    case 'isexactly':
      return bracket ? s === bracket : false;
    case 'not':
      return bracket ? s.toLowerCase() !== bracket.toLowerCase() : false;
    case 'notexactly':
      return bracket ? s !== bracket : false;
    case 'exactly':
      return bracket ? s.toLowerCase() === bracket.toLowerCase() : false;
    case 'creditcard': {
      const digits = s.replace(/\s/g, '');
      if (!luhnValid(digits)) {
        return false;
      }
      if (!bracket) {
        return true;
      }
      const types = bracket.split(',').map(t => t.trim().toLowerCase());
      return types.some(t => {
        const rx = CARD_TYPES[t];
        return rx && rx.test(digits);
      });
    }
    default:
      return true;
  }
}
