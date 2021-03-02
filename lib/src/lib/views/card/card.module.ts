/**
 * Created by bolor on 8/17/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiCardContentDirective} from './card-content.directive';
import {SuiCardDescriptionDirective} from './card-description.directive';
import {SuiCardExtraContentDirective} from './card-extra.directive';
import {SuiCardHeaderDirective} from './card-header.directive';
import {SuiCardImageDirective} from './card-image.directive';
import {SuiCardMetaDirective} from './card-meta.directive';
import {SuiCardDirective} from './card.directive';
import {SuiCardsDirective} from './cards.directive';

@NgModule({
  declarations: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardHeaderDirective,
    SuiCardContentDirective,
    SuiCardDescriptionDirective,
    SuiCardExtraContentDirective,
    SuiCardImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardHeaderDirective,
    SuiCardContentDirective,
    SuiCardDescriptionDirective,
    SuiCardExtraContentDirective,
    SuiCardImageDirective
  ]
})
export class SuiCardModule {
}
