/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuiStepComponent} from './step.component';
import {SuiStepsDirective} from './steps.directive';
import {SuiStepTitleDirective} from './step-title.directive';
import {SuiStepContentDirective} from './step-content.directive';
import {SuiStepDescriptionDirective} from './step-description.directive';

@NgModule({
  declarations: [
    SuiStepComponent,
    SuiStepsDirective,
    SuiStepTitleDirective,
    SuiStepContentDirective,
    SuiStepDescriptionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiStepComponent,
    SuiStepsDirective,
    SuiStepTitleDirective,
    SuiStepContentDirective,
    SuiStepDescriptionDirective
  ]
})
export class SuiStepsModule {
}
