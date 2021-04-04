/**
 * Created by bolor on 8/2/2020
 */

import {NgModule} from '@angular/core';
import {SuiItemsDirective} from './items.directive';
import {SuiItemDirective} from './item.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiItemsDirective, SuiItemDirective],
  imports: [CommonModule],
  declarations: [SuiItemsDirective, SuiItemDirective]
})
export class SuiItemsModule {
}
