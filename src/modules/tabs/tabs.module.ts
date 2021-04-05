/**
 * Created by bolorundurowb on 12/22/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiIconModule} from 'ngx-semantic/elements/icon';
import {SuiLabelModule} from 'ngx-semantic/elements/label';
import {SuiMenuModule} from 'ngx-semantic/collections/menu';
import {SuiSegmentModule} from 'ngx-semantic/elements/segment';

import {SuiTabComponent} from './tab.component';
import {SuiTabsComponent} from './tabs.component';

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
