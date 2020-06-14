/**
 * Created by bolor on 4/24/2020
 */

import {NgModule} from '@angular/core';
import {SuiHeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {SuiSubHeaderComponent} from './sub-header.component';

@NgModule({
  declarations: [SuiHeaderComponent, SuiSubHeaderComponent],
  imports: [CommonModule],
  exports: [SuiHeaderComponent, SuiSubHeaderComponent]
})
export class SuiHeaderModule {
}
