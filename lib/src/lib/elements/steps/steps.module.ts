/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiStepsComponent} from './steps.component';
import {SuiStepComponent} from './step.component';

@NgModule({
  declarations: [
    SuiStepsComponent,
    SuiStepComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiStepsComponent,
    SuiStepComponent
  ]
})
export class SuiStepsModule {
}
