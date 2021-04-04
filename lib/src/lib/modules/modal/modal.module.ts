/**
 * Created by bolorundurowb on 1/22/2021
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiIconModule} from '../../elements/icon';
import {SuiModalComponent} from './modal.component';
import {SuiModalActionsDirective} from './modal-actions.directive';
import {SuiModalContentDirective} from './modal-content.directive';

@NgModule({
  exports: [
    SuiModalComponent,
    SuiModalActionsDirective,
    SuiModalContentDirective
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  declarations: [
    SuiModalComponent,
    SuiModalActionsDirective,
    SuiModalContentDirective
  ]
})
export class SuiModalModule {
}
