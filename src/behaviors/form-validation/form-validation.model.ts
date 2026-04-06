/**
 * Types for Semantic UI [Form Validation](https://semantic-ui.com/behaviors/form.html) — Angular port.
 */

/** Single rule as string, e.g. `'empty'`, `'minLength[6]'`. */
export type SuiFormRuleTypeString = string;

export interface SuiFormValidationRuleSpec {
  /** Rule name, optionally with bracket param: `minLength[6]`, `integer[1..10]`. */
  type: SuiFormRuleTypeString;
  prompt?: string | ((value: unknown) => string);
  /** For `regExp` when brackets are awkward; also used by custom rules. */
  value?: unknown;
}

export interface SuiFormValidationFieldSpec {
  /** Defaults to the object key in `fields` when omitted. */
  identifier?: string;
  rules: SuiFormValidationRuleSpec[] | SuiFormRuleTypeString | SuiFormRuleTypeString[];
  optional?: boolean;
  /** Other field id/name/data-validate must be non-empty for these rules to run. */
  depends?: string;
}

/** Shorthand: `name: 'empty'` or `password: ['empty', 'minLength[6]']` or longhand field spec. */
export type SuiFormValidationFieldsInput = Record<
  string,
  SuiFormRuleTypeString | SuiFormRuleTypeString[] | SuiFormValidationFieldSpec
>;

export interface SuiFormNormalizedField {
  key: string;
  identifier: string;
  rules: SuiFormValidationRuleSpec[];
  optional: boolean;
  depends?: string;
}

export interface SuiFormRuleContext {
  getFieldValue(identifier: string): unknown;
  getFieldElement(identifier: string): Element | null;
}

export interface SuiFormRuleParseResult {
  name: string;
  bracket?: string;
}
