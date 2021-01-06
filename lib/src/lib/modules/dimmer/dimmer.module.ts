/**
 * Created by bolorundurowb on 1/6/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiDimmerDirective} from './dimmer.directive';

@NgModule({
  declarations: [SuiDimmerDirective],
  imports: [CommonModule],
  exports: [SuiDimmerDirective]
})
export class SuiDimmerModule {
}
