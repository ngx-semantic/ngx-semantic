/**
 * Created by bolor on 10/10/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiTableComponent} from './table.component';

@NgModule({
  declarations: [
    SuiTableComponent,
  ],
  exports: [
    SuiTableComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SuiTableModule {
}
