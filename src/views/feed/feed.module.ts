/**
 * Created by bolor on 7/28/2020
 */

import { NgModule } from '@angular/core';
import { SuiFeedDirective } from './feed.directive';
import { SuiFeedEventComponent } from './feed-event.component';
import { CommonModule } from '@angular/common';
import { SuiFeedMetaDirective } from './feed-meta.directive';
import { SuiFeedSummaryDirective } from './feed-summary.directive';
import { SuiFeedDateDirective } from './feed-date.directive';
import { SuiFeedExtraDirective } from './feed-extra.directive';
import { SuiFeedLikeDirective } from './feed-like.directive';
import { SuiFeedUserDirective } from 'ngx-semantic/views/feed/feed-user.directive';

@NgModule({
  exports: [
    SuiFeedDirective,
    SuiFeedEventComponent,
    SuiFeedMetaDirective,
    SuiFeedSummaryDirective,
    SuiFeedDateDirective,
    SuiFeedExtraDirective,
    SuiFeedLikeDirective,
    SuiFeedUserDirective
  ],
  imports: [ CommonModule ],
  declarations: [
    SuiFeedDirective,
    SuiFeedEventComponent,
    SuiFeedMetaDirective,
    SuiFeedSummaryDirective,
    SuiFeedDateDirective,
    SuiFeedExtraDirective,
    SuiFeedLikeDirective,
    SuiFeedUserDirective
  ]
})
export class SuiFeedModule {
}
