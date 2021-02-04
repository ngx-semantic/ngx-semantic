/**
 * Created by bolor on 4/23/2020
 */

import {NgModule} from '@angular/core';
import {SuiFlagDirective} from './flag.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiFlagDirective],
  imports: [CommonModule],
  exports: [SuiFlagDirective]
})
export class SuiFlagModule {
}
