/**
 * Created by bolor on 7/20/2020
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
  imports: [
    CommonModule,
    SuiCardDirective,
    SuiCardsDirective,
    SuiCardMetaDirective,
    SuiCardHeaderDirective,
    SuiCardContentDirective,
    SuiCardDescriptionDirective,
    SuiCardExtraContentDirective,
    SuiCardImageDirective
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
