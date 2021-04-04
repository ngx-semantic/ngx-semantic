/**
 * Created by bolor on 10/24/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SuiCheckboxComponent} from './checkbox.component';

@NgModule({
  declarations: [
    SuiCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SuiCheckboxComponent
  ]
})
export class SuiCheckboxModule {
}
