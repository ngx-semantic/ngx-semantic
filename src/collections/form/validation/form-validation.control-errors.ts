import type { AbstractControl } from '@angular/forms';
import { SUI_FORM_VALIDATION_ERROR_KEY } from './form-validation.model';

/** Merge or clear Semantic validation errors without wiping other validator errors on the control. */
export function patchSuiFormValidationControlError(control: AbstractControl, message: string | null): void {
  const key = SUI_FORM_VALIDATION_ERROR_KEY;
  const cur = control.errors;
  if (message === null) {
    if (!cur?.[key]) {
      return;
    }
    const rest = { ...cur };
    delete rest[key];
    control.setErrors(Object.keys(rest).length ? rest : null);
  } else {
    control.setErrors({ ...(cur || {}), [key]: message });
  }
}
