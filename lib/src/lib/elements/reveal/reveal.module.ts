/**
 * Created by bolor on 5/17/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiRevealDirective} from './reveal.directive';
import {SuiRevealContentDirective} from './reveal-content.directive';

@NgModule({
  declarations: [
    SuiRevealDirective,
    SuiRevealContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiRevealDirective,
    SuiRevealContentDirective
  ]
})
export class SuiRevealModule {
}
