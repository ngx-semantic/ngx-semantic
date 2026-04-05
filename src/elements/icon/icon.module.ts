/**
 * Created by bolor on 4/25/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconDirective} from './icon.directive';
import {SuiIconsDirective} from './icons.directive';

@NgModule({
  imports: [CommonModule, SuiIconDirective, SuiIconsDirective],
  exports: [
    SuiIconDirective,
    SuiIconsDirective
  ]
})
export class SuiIconModule {
}
