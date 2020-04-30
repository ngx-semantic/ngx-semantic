/**
 * Created by bolor on 4/28/2020
 */

import {NgModule} from '@angular/core';
import {SuiInputComponent} from './label.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiInputComponent],
  imports: [CommonModule],
  exports: [SuiInputComponent]
})
export class SuiInputModule {
}
