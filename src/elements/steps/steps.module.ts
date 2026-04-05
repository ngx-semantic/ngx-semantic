/**
 * Created by bolor on 5/18/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiStepContentDirective} from './step-content.directive';
import {SuiStepDescriptionDirective} from './step-description.directive';
import {SuiStepDirective} from './step.directive';
import {SuiStepsDirective} from './steps.directive';
import {SuiStepTitleDirective} from './step-title.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiStepTitleDirective,
    SuiStepDescriptionDirective,
    SuiStepDirective,
    SuiStepsDirective,
    SuiStepContentDirective
  ],
  exports: [
    SuiStepDirective,
    SuiStepsDirective,
    SuiStepTitleDirective,
    SuiStepContentDirective,
    SuiStepDescriptionDirective
  ]
})
export class SuiStepsModule {
}
