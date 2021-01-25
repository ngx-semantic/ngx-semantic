/**
 * Created by bolorundurowb on 1/25/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiAccordingPanelComponent} from './accordion-panel.component';
import {SuiAccordionComponent} from './accordion.component';

@NgModule({
  declarations: [
    SuiAccordionComponent,
    SuiAccordingPanelComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  exports: [
    SuiAccordionComponent,
    SuiAccordingPanelComponent
  ]
})
export class SuiAccordionModule {
}
