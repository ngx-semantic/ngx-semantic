/**
 * Created by bolorundurowb on 1/6/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiDimmerContentDirective} from './dimmer-content.directive';
import {SuiDimmerDirective} from './dimmer.directive';

@NgModule({
  declarations: [
    SuiDimmerDirective,
    SuiDimmerContentDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiDimmerDirective,
    SuiDimmerContentDirective
  ]
})
export class SuiDimmerModule {
}
