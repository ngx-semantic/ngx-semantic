/**
 * Created by bolor on 7/9/2020
 */

import {NgModule} from '@angular/core';
import {SuiAdvertisementDirective} from './advertisement.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiAdvertisementDirective],
  imports: [CommonModule],
  declarations: [SuiAdvertisementDirective]
})
export class SuiAdvertisementModule {
}
