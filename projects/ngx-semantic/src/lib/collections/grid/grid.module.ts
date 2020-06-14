/**
 * Created by bolor on 6/11/2020
 */

import {NgModule} from '@angular/core';
import {SuiGridComponent} from './grid.component';
import {CommonModule} from '@angular/common';
import {SuiGridColumnDirective} from './grid-column.directive';
import {SuiGridRowDirective} from './grid-row.directive';

@NgModule({
  declarations: [SuiGridComponent, SuiGridColumnDirective, SuiGridRowDirective],
  imports: [CommonModule],
  exports: [SuiGridComponent, SuiGridColumnDirective, SuiGridRowDirective]
})
export class SuiGridModule {
}
