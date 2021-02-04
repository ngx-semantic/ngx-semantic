import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiMessageContentDirective} from './message-content.directive';
import {SuiMessageHeaderDirective} from './message-header.directive';
import {SuiMessageComponent} from './message.component';

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
