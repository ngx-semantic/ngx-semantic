/**
 * Created by bolor on 5/2/2020
 */

import {NgModule} from '@angular/core';
import {SuiListComponent} from './list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiListComponent],
  imports: [CommonModule],
  exports: [SuiListComponent]
})
export class SuiListModule {
}
