/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderParagraphComponent} from './paragraph.component';
import {SuiPlaceholderLineComponent} from './line.component';
import {SuiPlaceholderImageComponent} from './image.component';

@NgModule({
  declarations: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent, SuiPlaceholderLineComponent, SuiPlaceholderImageComponent],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent, SuiPlaceholderLineComponent, SuiPlaceholderImageComponent]
})
export class SuiPlaceholderModule {
}
