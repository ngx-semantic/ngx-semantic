/**
 * Created by bolor on 5/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiRevealComponent} from './reveal.component';
import {CommonModule} from '@angular/common';
import {SuiRevealContentComponent} from './reveal-content.component';

@NgModule({
  declarations: [SuiRevealComponent, SuiRevealContentComponent],
  imports: [CommonModule],
  exports: [SuiRevealComponent, SuiRevealContentComponent]
})
export class SuiRevealModule {
}
