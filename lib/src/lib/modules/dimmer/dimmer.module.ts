/**
 * Created by bolorundurowb on 1/6/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiDimmerContentDirective} from './dimmer-content.directive';
import {SuiDimmerComponent} from './dimmer.component';
import {SuiDimmerDirective} from './dimmer.directive';

@NgModule({
  declarations: [
    SuiDimmerComponent,
    SuiDimmerDirective,
    SuiDimmerContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiDimmerComponent,
    SuiDimmerDirective,
    SuiDimmerContentDirective
  ]
})
export class SuiDimmerModule {
}
