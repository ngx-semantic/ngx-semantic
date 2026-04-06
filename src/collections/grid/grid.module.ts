/**
 * Created by bolor on 5/26/2020
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuiGridDirective } from './grid.directive';
import { SuiGridColumnDirective } from './grid-column.directive';
import { SuiGridRowDirective } from './grid-row.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiGridDirective,
    SuiGridColumnDirective,
    SuiGridRowDirective
  ],
  exports: [
    SuiGridDirective,
    SuiGridColumnDirective,
    SuiGridRowDirective
  ]
})
export class SuiGridModule {
}
