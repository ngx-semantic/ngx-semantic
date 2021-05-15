/**
 * Created by bolor on 5/18/2020
 */

import {NgModule} from '@angular/core';
import {SuiSegmentDirective} from './segment.directive';
import {CommonModule} from '@angular/common';
import {SuiSegmentsDirective} from './segments.directive';
import {SuiSegmentInlineDirective} from 'ngx-semantic/elements/segment/segment-inline.directive';

@NgModule({
  declarations: [
    SuiSegmentDirective,
    SuiSegmentsDirective,
    SuiSegmentInlineDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiSegmentDirective,
    SuiSegmentsDirective,
    SuiSegmentInlineDirective
  ]
})
export class SuiSegmentModule {
}
