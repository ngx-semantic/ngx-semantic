/**
 * Created by bolor on 4/24/2020
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuiHeaderDirective } from './header.directive';
import { SuiSubHeaderDirective } from './sub-header.directive';

@NgModule({
  imports: [CommonModule, SuiHeaderDirective, SuiSubHeaderDirective],
  exports: [SuiHeaderDirective, SuiSubHeaderDirective]
})
export class SuiHeaderModule {
}
