/**
 * Created by bolor on 4/23/2020
 */

import {NgModule} from '@angular/core';
import {SuiFlagComponent} from './flag.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiFlagComponent],
  imports: [CommonModule],
  exports: [SuiFlagComponent]
})
export class SuiFlagModule {
}
