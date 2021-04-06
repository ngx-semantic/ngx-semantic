/**
 * Created by bolor on 10/22/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiProgressComponent} from './progress.component';

@NgModule({
  declarations: [SuiProgressComponent],
  exports: [SuiProgressComponent],
  imports: [CommonModule],
})
export class SuiProgressModule {
}
