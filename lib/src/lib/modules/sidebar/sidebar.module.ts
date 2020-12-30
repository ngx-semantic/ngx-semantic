/**
 * Created by bolorundurowb on 12/30/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSidebarPusherComponent} from './sidebar-container.component';
import {SuiSidebarComponent} from './sidebar.component';

@NgModule({
  declarations: [
    SuiSidebarComponent,
    SuiSidebarPusherComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiSidebarComponent,
    SuiSidebarPusherComponent
  ]
})
export class SuiSidebarModule {
}
