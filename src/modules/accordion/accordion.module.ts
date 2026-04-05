/**
 * Created by bolorundurowb on 1/25/2021
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiAccordionPanelComponent} from './accordion-panel.component';
import {SuiAccordionComponent} from './accordion.component';

@NgModule({
  imports: [
    CommonModule,
    SuiAccordionComponent,
    SuiAccordionPanelComponent
  ],
  exports: [
    SuiAccordionComponent,
    SuiAccordionPanelComponent
  ]
})
export class SuiAccordionModule {
}
