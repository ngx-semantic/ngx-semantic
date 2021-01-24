/**
 * Created by bolorundurowb on 1/24/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiEmbedComponent} from './embed.component';

@NgModule({
  declarations: [
    SuiEmbedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiEmbedComponent
  ]
})
export class SuiEmbedModule {
}
