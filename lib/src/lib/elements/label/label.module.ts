/**
 * Created by bolor on 4/30/2020
 */

import {NgModule} from '@angular/core';
import {SuiLabelComponent} from './label.component';
import {CommonModule} from '@angular/common';
import {SuiLabelsComponent} from './labels.component';

@NgModule({
  declarations: [SuiLabelComponent, SuiLabelsComponent],
  imports: [CommonModule],
  exports: [SuiLabelComponent, SuiLabelsComponent]
})
export class SuiLabelModule {
}
