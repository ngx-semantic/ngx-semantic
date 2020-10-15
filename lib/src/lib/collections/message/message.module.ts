import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiMessageContentDirective} from './message-content.directive';
import {SuiMessageHeaderDirective} from './message-header.directive';
import {SuiMessageComponent} from './message.component';

@NgModule({
  declarations: [SuiMessageComponent, SuiMessageHeaderDirective, SuiMessageContentDirective],
  imports: [CommonModule],
  exports: [SuiMessageComponent, SuiMessageHeaderDirective, SuiMessageContentDirective],
})
export class SuiMessageModule {
}
