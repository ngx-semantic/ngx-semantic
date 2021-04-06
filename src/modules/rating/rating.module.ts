/**
 * Created by bolor on 10/24/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SuiRatingComponent} from './rating.component';

@NgModule({
  declarations: [
    SuiRatingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SuiRatingComponent
  ]
})
export class SuiRatingModule {
}
