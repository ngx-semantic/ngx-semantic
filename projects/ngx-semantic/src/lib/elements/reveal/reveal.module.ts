/**
 * Created by bolor on 5/17/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiRevealComponent} from './reveal.component';
import {SuiRevealContentDirective} from './reveal-content.directive';

@NgModule({
  declarations: [
    SuiRevealComponent,
    SuiRevealContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiRevealComponent,
    SuiRevealContentDirective
  ]
})
export class SuiRevealModule {
}
