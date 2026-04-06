/**
 * Created by bolor on 5/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiFormFieldDirective} from './form-field.directive';
import {SuiFormDirective} from './form.directive';
import {SuiFormFieldsDirective} from './form-fields.directive';
import {SuiFormValidationDirective} from './validation/form-validation.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective,
    SuiFormValidationDirective
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective,
    SuiFormValidationDirective
  ]
})
export class SuiFormModule {
}
