/**
 * Created by bolor on 5/18/2020
 */

import {NgModule} from '@angular/core';
import {SuiSegmentComponent} from './segment.component';
import {CommonModule} from '@angular/common';
import {SuiSegmentGroupComponent} from './segment-group.component';

@NgModule({
  declarations: [SuiSegmentComponent, SuiSegmentGroupComponent],
  imports: [CommonModule],
  exports: [SuiSegmentComponent, SuiSegmentGroupComponent]
})
export class SuiSegmentModule {
}
