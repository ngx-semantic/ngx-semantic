/**
 * Created by bolor on 4/30/2020
 */

import {NgModule} from '@angular/core';
import {SuiLabelComponent} from './label.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiLabelComponent],
  imports: [CommonModule],
  exports: [SuiLabelComponent]
})
export class SuiLabelModule {
}
