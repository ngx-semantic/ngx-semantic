/**
 * Created by bolor on 7/28/2020
 */

import {NgModule} from '@angular/core';
import {SuiFeedDirective} from './feed.directive';
import {SuiFeedEventDirective} from './feed-event.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiFeedDirective, SuiFeedEventDirective],
  imports: [CommonModule],
  declarations: [SuiFeedDirective, SuiFeedEventDirective]
})
export class SuiFeedModule {
}
