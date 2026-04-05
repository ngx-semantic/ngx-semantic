/**
 * Created by bolorundurowb on 12/22/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuiTabComponent} from './tab.component';
import {SuiTabsComponent} from './tabs.component';

@NgModule({
  imports: [
    CommonModule,
    SuiTabComponent,
    SuiTabsComponent
  ],
  exports: [
    SuiTabComponent,
    SuiTabsComponent
  ]
})
export class SuiTabsModule {
}
