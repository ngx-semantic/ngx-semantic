/**
 * Created by bolor on 5/2/2020
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuiListItemDirective } from './list-item.directive';
import { SuiListDirective } from './list.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiListDirective,
    SuiListItemDirective
  ],
  exports: [
    SuiListDirective,
    SuiListItemDirective
  ]
})
export class SuiListModule {
}
