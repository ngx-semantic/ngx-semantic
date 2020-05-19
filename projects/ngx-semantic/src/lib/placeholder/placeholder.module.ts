/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderParagraphDirective} from './paragraph.directive';
import {SuiPlaceholderLineDirective} from './line.directive';
import {SuiPlaceholderImageDirective} from './image.directive';

@NgModule({
  declarations: [SuiPlaceholderComponent, SuiPlaceholderParagraphDirective, SuiPlaceholderLineDirective, SuiPlaceholderImageDirective],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent, SuiPlaceholderParagraphDirective, SuiPlaceholderLineDirective, SuiPlaceholderImageDirective]
})
export class SuiPlaceholderModule {
}
