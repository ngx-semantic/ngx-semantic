import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ButtonDirective } from './button.directive';


@NgModule({
  declarations: [ButtonDirective],
  imports: [
    CommonModule
  ]
})
export class ButtonModule {
}
