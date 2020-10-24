/**
 * Created by bolor on 10/24/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiRatingComponent} from './rating.component';

@NgModule({
  declarations: [
    SuiRatingComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SuiRatingComponent,
  ],
})
export class SuiRatingModule {
}
