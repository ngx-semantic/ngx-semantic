/**
 * Created by bolor on 8/2/2020
 */

import { NgModule } from '@angular/core';
import { SuiItemsDirective } from './items.directive';
import { SuiItemDirective } from './item.directive';
import { CommonModule } from '@angular/common';
import { SuiItemContentDirective } from './item-content.directive';
import { SuiItemMetadataDirective } from './item-metadata.directive';
import { SuiItemHeaderDirective } from './item-header.directive';
import { SuiItemDescriptionDirective } from './item-description.directive';
import { SuiItemExtraContentDirective } from './item-extra-content.directive';
import { SuiItemImageDirective } from 'ngx-semantic/views/items/item-image.directive';

@NgModule({
  exports: [
    SuiItemsDirective,
    SuiItemDirective,
    SuiItemContentDirective,
    SuiItemMetadataDirective,
    SuiItemHeaderDirective,
    SuiItemImageDirective,
    SuiItemDescriptionDirective,
    SuiItemExtraContentDirective
  ],
  imports: [ CommonModule ],
  declarations: [
    SuiItemsDirective,
    SuiItemDirective,
    SuiItemImageDirective,
    SuiItemContentDirective,
    SuiItemMetadataDirective,
    SuiItemHeaderDirective,
    SuiItemDescriptionDirective,
    SuiItemExtraContentDirective
  ]
})
export class SuiItemsModule {
}
