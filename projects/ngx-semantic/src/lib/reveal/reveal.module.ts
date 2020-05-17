/**
 * Created by bolor on 5/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiRevealComponent} from './reveal.component';
import {CommonModule} from '@angular/common';
import { RevealContentDirective } from './reveal-content.directive';

@NgModule({
  declarations: [SuiRevealComponent, RevealContentDirective],
  imports: [CommonModule],
  exports: [SuiRevealComponent]
})
export class SuiRevealModule {
}
