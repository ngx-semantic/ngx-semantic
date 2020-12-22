/**
 * Created by bolorundurowb on 12/22/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiTabPaneComponent} from './tab-pane.component';
import {SuiTabComponent} from './tab.component';

@NgModule({
  declarations: [
    SuiTabComponent,
    SuiTabPaneComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiTabComponent,
    SuiTabPaneComponent
  ]
})
export class SuiTabModule {
}
