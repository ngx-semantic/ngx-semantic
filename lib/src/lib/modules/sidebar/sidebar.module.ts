/**
 * Created by bolorundurowb on 12/30/2020
 */

import {NgModule} from "@angular/core";
import {SuiSidebarComponent} from "./sidebar.component";
import {SuiSidebarContainerComponent} from "./sidebar-container.component";
import {CommonModule} from "@angular/common";

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
