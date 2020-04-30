/**
 * Created by bolor on 4/30/2020
 */

import {NgModule} from '@angular/core';
import {SuiLabelComponent} from './label.component';
import {CommonModule} from '@angular/common';
import {SuiLabelGroupComponent} from './label-group.component';

@NgModule({
  declarations: [SuiLabelComponent, SuiLabelGroupComponent],
  imports: [CommonModule],
  exports: [SuiLabelComponent, SuiLabelGroupComponent]
})
export class SuiLabelModule {
}
