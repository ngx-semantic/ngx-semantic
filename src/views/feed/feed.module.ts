/**
 * Created by bolor on 7/28/2020
 */

import { NgModule } from '@angular/core';
import { SuiFeedDirective } from './feed.directive';
import { SuiFeedEventComponent } from './feed-event.component';
import { CommonModule } from '@angular/common';
import { SuiFeedMetaDirective } from './feed-meta.directive';
import { SuiFeedSummaryDirective } from './feed-summary.directive';

@NgModule({
  exports: [
    SuiFeedDirective,
    SuiFeedEventComponent,
    SuiFeedMetaDirective,
    SuiFeedSummaryDirective
  ],
  imports: [ CommonModule ],
  declarations: [
    SuiFeedDirective,
    SuiFeedEventComponent,
    SuiFeedMetaDirective,
    SuiFeedSummaryDirective
  ]
})
export class SuiFeedModule {
}
