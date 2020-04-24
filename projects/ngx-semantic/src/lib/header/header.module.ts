/**
 * Created by bolor on 4/24/2020
 */

import {NgModule} from '@angular/core';
import {SuiHeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiHeaderComponent],
  imports: [CommonModule],
  exports: [SuiHeaderComponent]
})
export class SuiHeaderModule {
}
