/**
 * Created by bolor on 7/28/2020
 */

import {NgModule} from '@angular/core';
import {SuiFeedComponent} from './feed.component';
import {SuiFeedEventDirective} from './feed-event.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [SuiFeedComponent, SuiFeedEventDirective],
  imports: [CommonModule],
  declarations: [SuiFeedComponent, SuiFeedEventDirective]
})
export class SuiFeedModule {
}
