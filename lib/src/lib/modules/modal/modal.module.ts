/**
 * Created by bolorundurowb on 1/22/2021
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiModalComponent} from './modal.component';

@NgModule({
  exports: [
    SuiModalComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    SuiModalComponent
  ]
})
export class SuiModalModule {
}
