/**
 * Created by bolor on 4/28/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiInputDirective} from './input.directive';

@NgModule({
  declarations: [SuiInputDirective],
  imports: [CommonModule],
  exports: [SuiInputDirective]
})
export class SuiInputModule {
}
