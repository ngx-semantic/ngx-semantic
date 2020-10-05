/**
 * Created by bolor on 4/26/2020
 */

import {NgModule} from '@angular/core';
import {SuiImageComponent} from './image.component';
import {SuiImagesComponent} from './images.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiImageComponent, SuiImagesComponent],
  imports: [CommonModule],
  exports: [SuiImageComponent, SuiImagesComponent]
})
export class SuiImageModule {
}
