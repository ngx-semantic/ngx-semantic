/**
 * Created by bolor on 4/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiImageComponent} from './image.component';
import {SuiImagesComponent} from './images.component';

@NgModule({
  declarations: [SuiImageComponent, SuiImagesComponent],
  imports: [CommonModule],
  exports: [SuiImageComponent, SuiImagesComponent]
})
export class SuiImageModule {
}
