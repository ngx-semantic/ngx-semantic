/**
 * Created by bolorundurowb on 1/22/2021
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiModalActionsDirective} from './modal-actions.directive';
import {SuiModalContentDirective} from './modal-content.directive';
import {SuiModalHeaderDirective} from './modal-header.directive';
import {SuiModalComponent} from './modal.component';

@NgModule({
  exports: [
    SuiModalComponent,
    SuiModalHeaderDirective,
    SuiModalActionsDirective,
    SuiModalContentDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    SuiIconModule
  ],
  declarations: [
    SuiModalComponent,
    SuiModalHeaderDirective,
    SuiModalActionsDirective,
    SuiModalContentDirective
  ]
})
export class SuiModalModule {
}
