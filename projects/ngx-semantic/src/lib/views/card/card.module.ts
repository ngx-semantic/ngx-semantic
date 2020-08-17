/**
 * Created by bolor on 8/17/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCardComponent} from './card.component';
import {SuiCardsComponent} from './cards.component';

@NgModule({
  declarations: [SuiCardComponent, SuiCardsComponent],
  imports: [CommonModule],
  exports: [SuiCardComponent, SuiCardsComponent]
})
export class SuiCardModule {
}
