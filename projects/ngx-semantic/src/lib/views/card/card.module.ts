/**
 * Created by bolor on 8/17/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCardComponent} from './card.component';

@NgModule({
  declarations: [SuiCardComponent],
  imports: [CommonModule],
  exports: [SuiCardComponent]
})
export class SuiCardModule {
}
