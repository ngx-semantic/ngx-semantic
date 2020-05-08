/**
 * Created by bolor on 5/8/2020
 */

import {NgModule} from '@angular/core';
import {SuiRailComponent} from './rail.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiRailComponent],
  imports: [CommonModule],
  exports: [SuiRailComponent]
})
export class SuiRailModule {
}
