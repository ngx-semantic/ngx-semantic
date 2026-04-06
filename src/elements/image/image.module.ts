/**
 * Created by bolor on 4/26/2020
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuiImageDirective } from './image.directive';
import { SuiImagesDirective } from './images.directive';

@NgModule({
  imports: [CommonModule, SuiImageDirective, SuiImagesDirective],
  exports: [SuiImageDirective, SuiImagesDirective]
})
export class SuiImageModule {
}
