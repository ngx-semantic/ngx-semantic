/**
 * Created by bolorundurowb on 1/24/2021
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiEmbedComponent} from './embed.component';
import {SafeUrlPipe} from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    SuiEmbedComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  exports: [
    SuiEmbedComponent
  ]
})
export class SuiEmbedModule {
}
