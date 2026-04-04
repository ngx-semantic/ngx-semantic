/**
 * Created by bolor on 9/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuiStepDirective} from './step.directive';
import {SuiStepsDirective} from './steps.directive';
import {SuiStepTitleDirective} from './step-title.directive';
import {SuiStepContentDirective} from './step-content.directive';
import {SuiStepDescriptionDirective} from './step-description.directive';

@NgModule({
  declarations: [
    SuiStepTitleDirective,
    SuiStepDescriptionDirective
  ],
  imports: [
    CommonModule,
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
