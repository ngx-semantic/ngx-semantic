import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiPopupDirective} from './popup.directive';

@NgModule({
  declarations: [
    SuiPopupDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiPopupDirective
  ]
})
export class SuiPopupModule {
}
