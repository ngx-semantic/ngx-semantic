/**
 * Created by bolor on 9/22/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiContainerDirective} from './container.directive';

@NgModule({
  declarations: [
    SuiContainerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiContainerDirective
  ]
})
export class SuiContainerModule {
}
