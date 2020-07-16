/**
 * Created by bolor on 7/16/2020
 */

import {NgModule} from '@angular/core';
import {SuiStatisticLabelDirective} from './statistic-label.directive';
import {SuiStatisticValueDirective} from './statistic-value.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiStatisticLabelDirective, SuiStatisticValueDirective],
  imports: [CommonModule],
  exports: [SuiStatisticValueDirective, SuiStatisticLabelDirective]
})
export class SuiStatisticModule {
}
