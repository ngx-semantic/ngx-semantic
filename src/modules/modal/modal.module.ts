/**
 * Created by bolorundurowb on 1/22/2021
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiIconModule } from 'ngx-semantic/elements/icon';
import { SuiModalComponent } from './modal.component';
import { SuiModalActionsDirective } from './modal-actions.directive';
import { SuiModalContentDirective } from './modal-content.directive';
import { SuiModalDescriptionDirective } from './modal-description.directive';

@NgModule({
  exports: [
    SuiModalComponent,
    SuiModalActionsDirective,
    SuiModalContentDirective,
    SuiModalDescriptionDirective
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  declarations: [
    SuiModalComponent,
    SuiModalActionsDirective,
    SuiModalContentDirective,
    SuiModalDescriptionDirective
  ]
})
export class SuiModalModule {
}
