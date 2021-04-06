/**
 * Created by bolor on 4/30/2020
 */

import {NgModule} from '@angular/core';
import {SuiLabelDirective} from './label.directive';
import {CommonModule} from '@angular/common';
import {SuiLabelsDirective} from './labels.directive';

@NgModule({
  declarations: [SuiLabelDirective, SuiLabelsDirective],
  imports: [CommonModule],
  exports: [SuiLabelDirective, SuiLabelsDirective]
})
export class SuiLabelModule {
}
