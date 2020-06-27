import {NgModule} from "@angular/core";
import {SuiMessageComponent} from "./message.component";
import {CommonModule} from "@angular/common";
import {SuiMessageHeaderDirective} from "./message-header.directive";

@NgModule({
  declarations: [SuiMessageComponent, SuiMessageHeaderDirective],
  imports: [CommonModule],
  exports: [SuiMessageComponent, SuiMessageHeaderDirective]
})
export class SuiMessageModule {
}
