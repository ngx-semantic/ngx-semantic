import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiButtonComponent} from './button.component';
import {SuiButtonGroupComponent} from './button-group.component';

@NgModule({
  declarations: [SuiButtonComponent, SuiButtonGroupComponent],
  imports: [CommonModule],
  exports: [SuiButtonComponent, SuiButtonGroupComponent]
})
export class SuiButtonModule {
}
