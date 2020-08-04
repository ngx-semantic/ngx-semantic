/**
 * Created by bolor on 8/2/2020
 */

import {NgModule} from '@angular/core';
import {SuiItemsComponent} from './items.component';
import {SuiItemDirective} from './item.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiItemsComponent, SuiItemDirective],
  imports: [CommonModule],
  declarations: [SuiItemsComponent, SuiItemDirective]
})
export class SuiItemsModule {
}
