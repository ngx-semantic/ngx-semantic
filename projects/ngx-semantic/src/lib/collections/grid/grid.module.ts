/**
 * Created by bolor on 6/11/2020
 */

import {NgModule} from '@angular/core';
import {SuiGridComponent} from './grid.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiGridComponent],
  imports: [CommonModule],
  exports: [SuiGridComponent]
})
export class SuiGridModule {
}
