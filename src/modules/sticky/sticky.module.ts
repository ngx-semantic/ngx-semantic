import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiStickyDirective} from './sticky.directive';

@NgModule({
  imports: [CommonModule, SuiStickyDirective],
  exports: [SuiStickyDirective]
})
export class SuiStickyModule {}
