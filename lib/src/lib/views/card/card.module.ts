/**
 * Created by bolor on 8/17/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiCardContentDirective} from './card-content.directive';
import {SuiCardExtraContentDirective} from './card-extra.directive';
import {SuiCardMetaDirective} from './card-meta.directive';
import {SuiCardDirective} from './card.directive';
import {SuiCardsDirective} from './cards.directive';

@NgModule({
  declarations: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardContentDirective,
    SuiCardExtraContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardContentDirective,
    SuiCardExtraContentDirective
  ]
})
export class SuiCardModule {
}
