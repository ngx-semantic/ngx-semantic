/**
 * Created by bolor on 5/4/2020
 */

import {NgModule} from '@angular/core';
import {SuiLoaderComponent} from './loader.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiLoaderComponent],
  imports: [CommonModule],
  exports: [SuiLoaderComponent]
})
export class SuiLoaderModule {
}
