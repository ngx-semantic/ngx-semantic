import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiFormValidationDirective} from './form-validation.directive';

@NgModule({
  imports: [CommonModule, SuiFormValidationDirective],
  exports: [SuiFormValidationDirective]
})
export class SuiFormValidationModule {}
