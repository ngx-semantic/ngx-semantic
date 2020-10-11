/**
 * Created by bolor on 10/10/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiTableCellDirective} from './table-data-cell.directive';
import {SuiTableHeaderCellDirective} from './table-header-cell.directive';
import {SuiTableRowDirective} from './table-row.directive';
import {SuiTableComponent} from './table.component';

@NgModule({
  declarations: [
    SuiTableComponent,
    SuiTableRowDirective,
    SuiTableCellDirective,
    SuiTableHeaderCellDirective,
  ],
  exports: [
    SuiTableComponent,
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
