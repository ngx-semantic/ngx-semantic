/**
 * Created by bolor on 4/26/2020
 */

import {NgModule} from '@angular/core';
import {SuiImageComponent} from './image.component';
import {SuiImageGroupComponent} from './image-group.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiImageComponent, SuiImageGroupComponent],
  imports: [CommonModule],
  exports: [SuiImageComponent, SuiImageGroupComponent]
})
export class SuiImageModule {
}
