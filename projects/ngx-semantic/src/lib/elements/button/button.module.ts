import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiButtonComponent} from './button.component';
import {SuiButtonsComponent} from './buttons.component';

@NgModule({
  declarations: [SuiButtonComponent, SuiButtonsComponent],
  imports: [CommonModule],
  exports: [SuiButtonComponent, SuiButtonsComponent]
})
export class SuiButtonModule {
}
