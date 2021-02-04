/**
 * Created by bolor on 8/17/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCardDirective} from './card.directive';
import {SuiCardsDirective} from './cards.directive';

@NgModule({
  declarations: [SuiCardDirective, SuiCardsDirective],
  imports: [CommonModule],
  exports: [SuiCardDirective, SuiCardsDirective]
})
export class SuiCardModule {
}
