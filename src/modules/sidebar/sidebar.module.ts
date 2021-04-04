/**
 * Created by bolorundurowb on 12/30/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSidebarContainerComponent} from './sidebar-container.component';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';
import {SuiSidebarComponent} from './sidebar.component';
import {SuiSidebarService} from './sidebar.service';

@NgModule({
  declarations: [
    SuiSidebarComponent,
    SuiSidebarPusherComponent,
    SuiSidebarContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiSidebarComponent,
    SuiSidebarPusherComponent,
    SuiSidebarContainerComponent
  ],
  providers: [
    SuiSidebarService
  ]
})
export class SuiSidebarModule {
}
