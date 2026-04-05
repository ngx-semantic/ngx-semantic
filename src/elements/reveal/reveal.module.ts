/**
 * Created by bolor on 5/18/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiRevealContentDirective} from './reveal-content.directive';
import {SuiRevealDirective} from './reveal.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiRevealDirective,
    SuiRevealContentDirective
  ],
  exports: [
    SuiRevealDirective,
    SuiRevealContentDirective
  ]
})
export class SuiRevealModule {
}
