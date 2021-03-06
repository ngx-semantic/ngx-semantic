/**
 * Created by bolor on 6/5/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {SuiFormFieldsDirective} from './form-fields.directive';
import {SuiFormDirective} from './form.directive';

@NgModule({
  declarations: [
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiFormFieldDirective,
    SuiFormDirective,
    SuiFormFieldsDirective
  ]
})
export class SuiFormModule {
}
