/**
 * Created by bolor on 5/8/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiRailDirective} from './rail.directive';

@NgModule({
  declarations: [
    SuiRailDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiRailDirective
  ]
})
export class SuiRailModule {
}
