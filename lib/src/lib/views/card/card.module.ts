/**
 * Created by bolor on 8/17/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiCardContentDirective} from './card-content.directive';
import {SuiCardMetaDirective} from './card-meta.directive';
import {SuiCardDirective} from './card.directive';
import {SuiCardsDirective} from './cards.directive';

@NgModule({
  declarations: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardContentDirective
  ]
})
export class SuiCardModule {
}
