/**
 * Created by bolor on 5/18/2020
 */

import {NgModule} from '@angular/core';
import {SuiSegmentDirective} from './segment.directive';
import {CommonModule} from '@angular/common';
import {SuiSegmentsDirective} from './segments.directive';

@NgModule({
  declarations: [SuiSegmentDirective, SuiSegmentsDirective],
  imports: [CommonModule],
  exports: [SuiSegmentDirective, SuiSegmentsDirective]
})
export class SuiSegmentModule {
}
