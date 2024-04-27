/**
 * Created by bolor on 7/28/2020
 */

import { NgModule } from '@angular/core';
import { SuiFeedDirective } from './feed.directive';
import { SuiFeedEventDirective } from './feed-event.directive';
import { CommonModule } from '@angular/common';
import { SuiFeedDateDirective } from 'ngx-semantic/views/feed/feed-date.directive';
import { SuiFeedMetaDirective } from 'ngx-semantic/views/feed/feed-meta.directive';
import { SuiFeedSummaryDirective } from 'ngx-semantic/views/feed/feed-summary.directive';

@NgModule({
  exports: [ SuiFeedDirective, SuiFeedEventDirective, SuiFeedDateDirective, SuiFeedMetaDirective, SuiFeedSummaryDirective ],
  imports: [ CommonModule ],
  declarations: [ SuiFeedDirective, SuiFeedEventDirective, SuiFeedDateDirective, SuiFeedMetaDirective, SuiFeedSummaryDirective ]
})
export class SuiFeedModule {
}
