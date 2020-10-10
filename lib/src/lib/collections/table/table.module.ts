/**
 * Created by bolor on 10/10/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiTableCellDirective} from './table-data-cell.directive';
import {SuiTableRowDirective} from './table-row.directive';
import {SuiTableComponent} from './table.component';

@NgModule({
  declarations: [
    SuiTableComponent,
    SuiTableRowDirective,
    SuiTableCellDirective,
  ],
  exports: [
    SuiTableComponent,
    SuiTableRowDirective,
    SuiTableCellDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class SuiTableModule {
}
