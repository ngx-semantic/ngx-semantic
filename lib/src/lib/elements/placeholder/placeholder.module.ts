/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderLineDirective} from './line.directive';
import {SuiPlaceholderImageDirective} from './image.directive';
import {SuiPlaceholderDirective} from './placeholder.directive';
import {SuiPlaceholderParagraphDirective} from './paragraph.directive';

@NgModule({
  declarations: [
    SuiPlaceholderDirective,
    SuiPlaceholderParagraphDirective,
    SuiPlaceholderLineDirective,
    SuiPlaceholderImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiPlaceholderDirective,
    SuiPlaceholderParagraphDirective,
    SuiPlaceholderLineDirective,
    SuiPlaceholderImageDirective
  ]
})
export class SuiPlaceholderModule {
}
