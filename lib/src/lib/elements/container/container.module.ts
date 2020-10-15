/**
 * Created by bolor on 9/22/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiContainerComponent} from './container.component';

@NgModule({
  declarations: [
    SuiContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SuiContainerComponent,
  ],
})
export class SuiContainerModule {
}
