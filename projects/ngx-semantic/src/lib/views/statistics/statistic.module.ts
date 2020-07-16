/**
 * Created by bolor on 7/16/2020
 */

import {NgModule} from '@angular/core';
import {SuiStatisticLabelDirective} from './statistic-label.directive';
import {SuiStatisticValueDirective} from './statistic-value.directive';
import {CommonModule} from '@angular/common';
import {SuiStatisticComponent} from './statistic.component';

@NgModule({
  declarations: [SuiStatisticLabelDirective, SuiStatisticValueDirective, SuiStatisticComponent],
  imports: [CommonModule],
  exports: [SuiStatisticValueDirective, SuiStatisticLabelDirective, SuiStatisticComponent]
})
export class SuiStatisticModule {
}
