/**
 * Created by bolor on 5/6/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiPlaceholderImageDirective} from './placeholder-image.directive';
import {SuiPlaceholderLineDirective} from './placeholder-line.directive';
import {SuiPlaceholderParagraphDirective} from './placeholder-paragraph.directive';
import {SuiPlaceholderHeaderDirective} from './placeholder-header.directive';
import {SuiPlaceholderDirective} from './placeholder.directive';

@NgModule({
  declarations: [
    SuiPlaceholderImageDirective,
    SuiPlaceholderHeaderDirective
  ],
  imports: [
    CommonModule,
    SuiPlaceholderDirective,
    SuiPlaceholderParagraphDirective,
    SuiPlaceholderLineDirective
  ],
  exports: [
    SuiPlaceholderDirective,
    SuiPlaceholderParagraphDirective,
    SuiPlaceholderLineDirective,
    SuiPlaceholderImageDirective,
    SuiPlaceholderHeaderDirective
  ]
})
export class SuiPlaceholderModule {
}
