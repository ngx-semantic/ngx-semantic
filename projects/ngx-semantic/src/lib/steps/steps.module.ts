import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiStepComponent} from './steps.component';

@NgModule({
  declarations: [SuiStepComponent],
  imports: [CommonModule],
  exports: [SuiStepComponent]
})
export class SuiStepModule {}
