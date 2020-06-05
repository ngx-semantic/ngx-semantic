/**
 * Created by bolor on 6/5/2020
 */

import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {CommonModule} from '@angular/common';
import {SuiFormComponent} from './form.component';
import {SuiFormFieldsDirective} from './form-fields.directive';

@NgModule({
  declarations: [SuiFormFieldDirective, SuiFormComponent, SuiFormFieldsDirective],
  imports: [CommonModule],
  exports: [SuiFormFieldDirective, SuiFormComponent, SuiFormFieldsDirective]
})
export class SuiFormModule {
}
