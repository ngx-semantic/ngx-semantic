/**
 * Created by bolorundurowb on 12/30/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiSidebarContainerComponent} from './sidebar-container.component';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';
import {SuiSidebarComponent} from './sidebar.component';
import {SuiSidebarService} from './sidebar.service';

@NgModule({
  imports: [
    CommonModule,
    SuiSidebarComponent,
    SuiSidebarPusherComponent,
    SuiSidebarContainerComponent
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
