import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiButtonComponent} from './button.component';

@NgModule({
  declarations: [SuiButtonComponent],
  imports: [CommonModule],
  exports: [SuiButtonComponent]
})
export class SuiButtonModule {
}
