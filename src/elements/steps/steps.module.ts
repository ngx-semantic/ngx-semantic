/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiStepsDirective} from './steps.directive';
import {SuiStepComponent} from './step.component';

@NgModule({
  declarations: [
    SuiStepsDirective,
    SuiStepComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiStepsDirective,
    SuiStepComponent
  ]
})
export class SuiStepsModule {
}
