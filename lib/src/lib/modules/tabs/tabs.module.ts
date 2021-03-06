/**
 * Created by bolorundurowb on 12/22/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiMenuModule} from '../../collections/menu';
import {SuiIconModule} from '../../elements/icon';
import {SuiSegmentModule} from '../../elements/segment';
import {SuiTabComponent} from './tab.component';
import {SuiTabsComponent} from './tabs.component';
import {SuiLabelModule} from "../../elements/label";

@NgModule({
  declarations: [
    SuiTabComponent,
    SuiTabsComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule,
    SuiMenuModule,
    SuiSegmentModule,
    SuiLabelModule
  ],
  exports: [
    SuiTabComponent,
    SuiTabsComponent
  ]
})
export class SuiTabsModule {
}
