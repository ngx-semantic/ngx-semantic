/**
 * Created by bolor on 6/11/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiGridColumnDirective} from './grid-column.directive';
import {SuiGridRowDirective} from './grid-row.directive';
import {SuiGridDirective} from './grid.directive';

@NgModule({
  declarations: [SuiGridDirective, SuiGridColumnDirective, SuiGridRowDirective],
  imports: [CommonModule],
  exports: [SuiGridDirective, SuiGridColumnDirective, SuiGridRowDirective],
})
export class SuiGridModule {
}
