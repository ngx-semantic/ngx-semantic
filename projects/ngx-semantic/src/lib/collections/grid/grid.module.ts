/**
 * Created by bolor on 6/11/2020
 */

import {NgModule} from '@angular/core';
import {SuiGridComponent} from './grid.component';
import {CommonModule} from '@angular/common';
import {SuiGridColumnDirective} from './grid-column.directive';

@NgModule({
  declarations: [SuiGridComponent, SuiGridColumnDirective],
  imports: [CommonModule],
  exports: [SuiGridComponent, SuiGridColumnDirective]
})
export class SuiGridModule {
}
