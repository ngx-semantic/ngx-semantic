/**
 * Created by bolor on 6/5/2020
 */

import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {CommonModule} from '@angular/common';
import {SuiFormComponent} from './form.component';

@NgModule({
  declarations: [SuiFormFieldDirective, SuiFormComponent],
  imports: [CommonModule],
  exports: [SuiFormFieldDirective, SuiFormComponent]
})
export class SuiFormModule {
}
