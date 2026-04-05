/**
 * Created by bolor on 5/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {SuiFormDirective} from './form.directive';
import {SuiFormFieldsDirective} from './form-fields.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective
  ],
  exports: [
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective
  ]
})
export class SuiFormModule {
}
