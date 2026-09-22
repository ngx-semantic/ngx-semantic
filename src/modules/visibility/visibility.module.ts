import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiVisibilityDirective } from './visibility.directive';

@NgModule({
  imports: [CommonModule, SuiVisibilityDirective],
  exports: [SuiVisibilityDirective]
})
export class SuiVisibilityModule {}
