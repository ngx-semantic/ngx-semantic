/**
 * Created by bolor on 6/5/2020
 */

import {NgModule} from '@angular/core';
import {SuiFormFieldDirective} from './form-field.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiFormFieldDirective],
  imports: [CommonModule],
  exports: [SuiFormFieldDirective]
})
export class SuiFormModule {
}
