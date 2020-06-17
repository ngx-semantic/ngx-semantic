/**
 * Created by bolor on 6/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiMenuComponent} from './menu.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiMenuComponent],
  imports: [CommonModule],
  exports: [SuiMenuComponent]
})
export class SuiMenuModule {
}
