import {NgModule} from "@angular/core";
import {SuiMessageComponent} from "./message.component";
import {CommonModule} from "@angular/common";
import {SuiMessageHeaderDirective} from "./message-header.directive";
import {SuiMessageContentDirective} from "./message-content.directive";

@NgModule({
  declarations: [SuiMessageComponent, SuiMessageHeaderDirective, SuiMessageContentDirective],
  imports: [CommonModule],
  exports: [SuiMessageComponent, SuiMessageHeaderDirective, SuiMessageContentDirective]
})
export class SuiMessageModule {
}
