/**
 * Created by bolor on 10/10/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiTableCellDirective} from './table-data-cell.directive';
import {SuiTableHeaderCellDirective} from './table-header-cell.directive';
import {SuiTableRowDirective} from './table-row.directive';
import {SuiTableDirective} from './table.directive';

@NgModule({
  declarations: [
    SuiTableDirective,
    SuiTableRowDirective,
    SuiTableCellDirective,
    SuiTableHeaderCellDirective,
  ],
  exports: [
    SuiTableDirective,
    SuiTableRowDirective,
    SuiTableCellDirective,
    SuiTableHeaderCellDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class SuiTableModule {
}
