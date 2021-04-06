import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiIconModule} from 'ngx-semantic/elements/icon';

import {SuiMessageComponent} from './message.component';
import {SuiMessageHeaderDirective} from './message-header.directive';
import {SuiMessageContentDirective} from './message-content.directive';

@NgModule({
  declarations: [
    SuiMessageComponent,
    SuiMessageHeaderDirective,
    SuiMessageContentDirective
  ],
  imports: [
    CommonModule,
    SuiIconModule],
  exports: [
    SuiMessageComponent,
    SuiMessageHeaderDirective,
    SuiMessageContentDirective
  ]
})
export class SuiMessageModule {
}
