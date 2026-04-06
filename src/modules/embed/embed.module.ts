/**
 * Created by bolorundurowb on 1/24/2021
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiEmbedComponent } from './embed.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    SuiEmbedComponent,
    SafeUrlPipe
  ],
  exports: [
    SuiEmbedComponent
  ]
})
export class SuiEmbedModule {
}
