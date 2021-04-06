/**
 * Created by bolor on 7/16/2020
 */

import {NgModule} from '@angular/core';
import {SuiStatisticLabelDirective} from './statistic-label.directive';
import {SuiStatisticValueDirective} from './statistic-value.directive';
import {CommonModule} from '@angular/common';
import {SuiStatisticDirective} from './statistic.directive';
import {SuiStatisticsDirective} from './statistics.directive';

@NgModule({
  declarations: [
    SuiStatisticLabelDirective,
    SuiStatisticValueDirective,
    SuiStatisticDirective,
    SuiStatisticsDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiStatisticValueDirective,
    SuiStatisticLabelDirective,
    SuiStatisticDirective,
    SuiStatisticsDirective
  ]
})
export class SuiStatisticModule {
}
