import type {
  SuiFormNormalizedField,
  SuiFormValidationFieldSpec,
  SuiFormValidationFieldsInput,
  SuiFormValidationRuleSpec
} from './form-validation.model';

function toRuleSpecs(
  rules: SuiFormValidationRuleSpec[] | string | string[]
): SuiFormValidationRuleSpec[] {
  if (typeof rules === 'string') {
    return [{type: rules}];
  }
  if (Array.isArray(rules)) {
    return rules.map(r => (typeof r === 'string' ? {type: r} : r));
  }
  return rules;
}

export function normalizeFields(input: SuiFormValidationFieldsInput): SuiFormNormalizedField[] {
  const out: SuiFormNormalizedField[] = [];
  for (const key of Object.keys(input)) {
    const raw = input[key];
    if (typeof raw === 'string' || Array.isArray(raw)) {
      out.push({
        key,
        identifier: key,
        rules: toRuleSpecs(raw),
        optional: false
      });
      continue;
    }
    const spec = raw as SuiFormValidationFieldSpec;
    out.push({
      key,
      identifier: spec.identifier ?? key,
      rules: toRuleSpecs(spec.rules),
      optional: !!spec.optional,
      depends: spec.depends
    });
  }
  return out;
}
