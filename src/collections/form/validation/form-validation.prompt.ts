import { parseRuleType } from './form-validation.rules';

const DEFAULT_PROMPTS: Record<string, string> = {
  empty: '{name} must have a value',
  checked: '{name} must be checked',
  email: '{name} must be a valid e-mail',
  url: '{name} must be a valid url',
  regexp: '{name} is not formatted correctly',
  integer: '{name} must be an integer',
  decimal: '{name} must be a decimal number',
  number: '{name} must be set to a number',
  is: "{name} must be '{ruleValue}'",
  isexactly: "{name} must be exactly '{ruleValue}'",
  not: "{name} cannot be set to '{ruleValue}'",
  notexactly: "{name} cannot be set to exactly '{ruleValue}'",
  contains: "{name} must contain '{ruleValue}'",
  containsexactly: "{name} must contain exactly '{ruleValue}'",
  doesntcontain: "{name} must not contain '{ruleValue}'",
  doesntcontainexactly: "{name} must not contain exactly '{ruleValue}'",
  minlength: '{name} must be at least {ruleValue} characters',
  exactlength: '{name} must be exactly {ruleValue} characters',
  maxlength: '{name} cannot be longer than {ruleValue} characters',
  match: '{name} must match {ruleValue} field',
  different: '{name} must have a different value than {ruleValue} field',
  creditcard: '{name} must be a valid credit card number',
  mincount: '{name} must have at least {ruleValue} choices',
  exactcount: '{name} must have exactly {ruleValue} choices',
  maxcount: '{name} must have {ruleValue} or less choices',
  exactly: "{name} must be '{ruleValue}'"
};

export function formatValidationPrompt(
  ruleType: string,
  fieldName: string,
  fieldIdentifier: string,
  fieldValue: unknown,
  customPrompt: string | ((value: unknown) => string) | undefined,
  ruleValue: string
): string {
  if (typeof customPrompt === 'function') {
    return customPrompt(fieldValue);
  }
  if (customPrompt) {
    return applyTemplate(customPrompt, fieldName, fieldIdentifier, fieldValue, ruleValue);
  }
  const { name } = parseRuleType(ruleType);
  const key = name.toLowerCase();
  const template = DEFAULT_PROMPTS[key] ?? 'Please enter a valid value';
  return applyTemplate(template, fieldName, fieldIdentifier, fieldValue, ruleValue);
}

function applyTemplate(
  template: string,
  name: string,
  identifier: string,
  value: unknown,
  ruleValue: string
): string {
  const v =
    value === null || value === undefined
      ? ''
      : Array.isArray(value)
        ? value.join(',')
        : String(value);
  return template
    .replace(/\{name\}/g, name)
    .replace(/\{identifier\}/g, identifier)
    .replace(/\{value\}/g, v)
    .replace(/\{ruleValue\}/g, ruleValue);
}
