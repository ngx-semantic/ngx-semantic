import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiPopupComponent} from './popup.component';
import {SuiPopupDirective} from './popup.directive';

@NgModule({
  declarations: [
    SuiPopupDirective,
    SuiPopupComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    SuiPopupDirective,
    SuiPopupComponent
  ],
  entryComponents: [
    SuiPopupComponent
  ]
})
export class SuiPopupModule {
}
