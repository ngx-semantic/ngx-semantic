/**
 * Created by bolor on 6/5/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {SuiFormFieldsDirective} from './form-fields.directive';
import {SuiFormComponent} from './form.component';

@NgModule({
  declarations: [SuiFormFieldDirective, SuiFormComponent, SuiFormFieldsDirective],
  imports: [CommonModule],
  exports: [SuiFormFieldDirective, SuiFormComponent, SuiFormFieldsDirective],
})
export class SuiFormModule {
}
