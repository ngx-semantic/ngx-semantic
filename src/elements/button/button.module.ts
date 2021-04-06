import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiButtonDirective} from './button.directive';
import {SuiButtonsDirective} from './buttons.directive';

@NgModule({
  declarations: [SuiButtonDirective, SuiButtonsDirective],
  imports: [CommonModule],
  exports: [SuiButtonDirective, SuiButtonsDirective]
})
export class SuiButtonModule {
}
