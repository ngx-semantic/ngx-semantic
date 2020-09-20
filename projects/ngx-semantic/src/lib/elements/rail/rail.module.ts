/**
 * Created by bolor on 5/8/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiRailComponent} from './rail.component';

@NgModule({
  declarations: [
    SuiRailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiRailComponent
  ]
})
export class SuiRailModule {
}
