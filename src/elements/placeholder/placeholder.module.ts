/**
 * Created by bolor on 5/18/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiPlaceholderHeaderDirective} from './placeholder-header.directive';
import {SuiPlaceholderImageDirective} from './placeholder-image.directive';
import {SuiPlaceholderLineDirective} from './placeholder-line.directive';
import {SuiPlaceholderParagraphDirective} from './placeholder-paragraph.directive';
import {SuiPlaceholderDirective} from './placeholder.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiPlaceholderImageDirective,
    SuiPlaceholderHeaderDirective,
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
