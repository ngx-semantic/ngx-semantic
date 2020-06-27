import {NgModule} from "@angular/core";
import {SuiMessageComponent} from "./message.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [SuiMessageComponent],
  imports: [CommonModule],
  exports: [SuiMessageComponent]
})
export class SuiMessageModule {
}
