/**
 * Created by bolorundurowb on 12/30/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiSidebarService} from './sidebar.service';
import {SuiSidebarComponent} from './sidebar.component';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';
import {SuiSidebarContainerComponent} from './sidebar-container.component';

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
