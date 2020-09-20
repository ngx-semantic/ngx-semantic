/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {SuiStepsComponent} from './steps.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SuiStepsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiStepsComponent
  ]
})
export class SuiStepsModule {
}
