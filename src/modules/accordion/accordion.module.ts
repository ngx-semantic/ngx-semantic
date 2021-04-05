/**
 * Created by bolorundurowb on 1/25/2021
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiIconModule} from 'ngx-semantic/elements/icon';

import {SuiAccordionComponent} from './accordion.component';
import {SuiAccordionPanelComponent} from './accordion-panel.component';

@NgModule({
  declarations: [
    SuiAccordionComponent,
    SuiAccordionPanelComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  exports: [
    SuiAccordionComponent,
    SuiAccordionPanelComponent
  ]
})
export class SuiAccordionModule {
}
