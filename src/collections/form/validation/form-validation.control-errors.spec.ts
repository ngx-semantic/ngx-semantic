import { FormControl } from '@angular/forms';
import { patchSuiFormValidationControlError } from './form-validation.control-errors';
import { SUI_FORM_VALIDATION_ERROR_KEY } from './form-validation.model';

describe('patchSuiFormValidationControlError', () => {
  it('sets merged errors when patching a message', () => {
    const c = new FormControl('', { nonNullable: true });
    c.setErrors({ required: true });
    patchSuiFormValidationControlError(c, 'Semantic says no');
    expect(c.errors).toEqual({
      required: true,
      [SUI_FORM_VALIDATION_ERROR_KEY]: 'Semantic says no'
    });
  });

  it('clears only the Semantic key when message is null', () => {
    const c = new FormControl('', { nonNullable: true });
    c.setErrors({
      required: true,
      [SUI_FORM_VALIDATION_ERROR_KEY]: 'x'
    });
    patchSuiFormValidationControlError(c, null);
    expect(c.errors).toEqual({ required: true });
  });

  it('sets errors to null when only Semantic key existed', () => {
    const c = new FormControl('', { nonNullable: true });
    c.setErrors({ [SUI_FORM_VALIDATION_ERROR_KEY]: 'x' });
    patchSuiFormValidationControlError(c, null);
    expect(c.errors).toBeNull();
  });

  it('no-ops clear when Semantic key is absent', () => {
    const c = new FormControl('', { nonNullable: true });
    c.setErrors({ required: true });
    patchSuiFormValidationControlError(c, null);
    expect(c.errors).toEqual({ required: true });
  });
});
