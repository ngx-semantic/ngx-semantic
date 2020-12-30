/**
 * Created by bolorundurowb on 12/30/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSidebarContainerComponent} from './sidebar-container.component';
import {SuiSidebarComponent} from './sidebar.component';

@NgModule({
  declarations: [
    SuiSidebarComponent,
    SuiSidebarContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiSidebarComponent,
    SuiSidebarContainerComponent
  ]
})
export class SuiSidebarModule {
}
