/**
 * Created by bolor on 5/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiRevealComponent} from './reveal.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiRevealComponent],
  imports: [CommonModule],
  exports: [SuiRevealComponent]
})
export class SuiRevealModule {
}
