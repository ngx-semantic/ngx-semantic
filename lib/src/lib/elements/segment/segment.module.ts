/**
 * Created by bolor on 5/18/2020
 */

import {NgModule} from '@angular/core';
import {SuiSegmentComponent} from './segment.component';
import {CommonModule} from '@angular/common';
import {SuiSegmentsComponent} from './segments.component';

@NgModule({
  declarations: [SuiSegmentComponent, SuiSegmentsComponent],
  imports: [CommonModule],
  exports: [SuiSegmentComponent, SuiSegmentsComponent]
})
export class SuiSegmentModule {
}
