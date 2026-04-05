/**
 * Created by bolor on 5/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiMessageComponent} from './message.component';
import {SuiMessageContentDirective} from './message-content.directive';
import {SuiMessageHeaderDirective} from './message-header.directive';
import {SuiMessageListDirective} from './message-list.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiMessageComponent,
    SuiMessageHeaderDirective,
    SuiMessageContentDirective,
    SuiMessageListDirective
  ],
  exports: [
    SuiMessageComponent,
    SuiMessageHeaderDirective,
    SuiMessageContentDirective,
    SuiMessageListDirective
  ]
})
export class SuiMessageModule {
}
