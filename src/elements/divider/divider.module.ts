/**
 * Created by bolor on 4/22/2020
 */

import { NgModule } from '@angular/core';
import { SuiDividerDirective } from './divider.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SuiDividerDirective],
  exports: [SuiDividerDirective]
})
export class SuiDividerModule {
}
