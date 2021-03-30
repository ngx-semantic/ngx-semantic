/**
 * Created by bolorundurowb on 1/6/2021
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiDimmerDirective} from './dimmer.directive';
import {SuiDimmerComponent} from './dimmer.component';
import {SuiDimmerContentDirective} from './dimmer-content.directive';

@NgModule({
  declarations: [
    SuiDimmerDirective,
    SuiDimmerComponent,
    SuiDimmerContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiDimmerDirective,
    SuiDimmerContentDirective
  ],
  entryComponents: [
    SuiDimmerComponent
  ]
})
export class SuiDimmerModule {
}
