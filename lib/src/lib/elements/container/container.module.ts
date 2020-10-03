/**
 * Created by bolor on 9/22/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiContainerComponent} from './container.component';

@NgModule({
  declarations: [
    SuiContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiContainerComponent
  ]
})
export class SuiContainerModule {
}
