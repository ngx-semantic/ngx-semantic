/**
 * Created by bolor on 4/24/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiHeaderComponent} from './header.component';
import {SuiSubHeaderComponent} from './sub-header.component';

@NgModule({
  declarations: [SuiHeaderComponent, SuiSubHeaderComponent],
  imports: [CommonModule],
  exports: [SuiHeaderComponent, SuiSubHeaderComponent]
})
export class SuiHeaderModule {
}
