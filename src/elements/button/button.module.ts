import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuiButtonDirective } from './button.directive';
import { SuiButtonsDirective } from './buttons.directive';

@NgModule({
  imports: [CommonModule, SuiButtonDirective, SuiButtonsDirective],
  exports: [SuiButtonDirective, SuiButtonsDirective]
})
export class SuiButtonModule {
}
