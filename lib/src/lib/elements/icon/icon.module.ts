/**
 * Created by bolor on 4/25/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconDirective} from './icon.component';

@NgModule({
  declarations: [SuiIconDirective],
  imports: [CommonModule],
  exports: [SuiIconDirective]
})
export class SuiIconModule {
}
