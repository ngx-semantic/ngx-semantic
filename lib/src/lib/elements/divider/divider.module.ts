/**
 * Created by bolor on 4/22/2020
 */

import {NgModule} from '@angular/core';
import {SuiDividerDirective} from './divider.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiDividerDirective],
  imports: [CommonModule],
  exports: [SuiDividerDirective]
})
export class SuiDividerModule {
}
