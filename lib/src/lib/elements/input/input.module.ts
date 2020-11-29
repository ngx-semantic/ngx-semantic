/**
 * Created by bolor on 4/28/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiInputComponent} from './input.component';

@NgModule({
  declarations: [SuiInputComponent],
  imports: [CommonModule],
  exports: [SuiInputComponent]
})
export class SuiInputModule {
}
