/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiPlaceholderComponent],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent]
})
export class SuiPlaceholderModule {
}
