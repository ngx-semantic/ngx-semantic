/**
 * Created by bolor on 7/9/2020
 */

import {NgModule} from '@angular/core';
import {SuiAdvertisementComponent} from './advertisement.component';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiAdvertisementComponent],
  imports: [CommonModule],
  declarations: [SuiAdvertisementComponent]
})
export class SuiAdvertisementModule {
}
