/**
 * Created by bolor on 5/2/2020
 */

import {NgModule} from '@angular/core';
import {SuiListDirective} from './list.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiListDirective],
  imports: [CommonModule],
  exports: [SuiListDirective]
})
export class SuiListModule {
}
