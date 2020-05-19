/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderParagraphDirective} from './paragraph.directive';
import {SuiPlaceholderLineComponent} from './line.component';
import {SuiPlaceholderImageComponent} from './image.component';

@NgModule({
  declarations: [SuiPlaceholderComponent, SuiPlaceholderParagraphDirective, SuiPlaceholderLineComponent, SuiPlaceholderImageComponent],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent, SuiPlaceholderParagraphDirective, SuiPlaceholderLineComponent, SuiPlaceholderImageComponent]
})
export class SuiPlaceholderModule {
}
