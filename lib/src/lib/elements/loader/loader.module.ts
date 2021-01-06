/**
 * Created by bolor on 5/4/2020
 */

import {NgModule} from '@angular/core';
import {SuiLoaderDirective} from './loader.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiLoaderDirective],
  imports: [CommonModule],
  exports: [SuiLoaderDirective]
})
export class SuiLoaderModule {
}
