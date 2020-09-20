/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiStepsComponent} from './steps.component';

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
