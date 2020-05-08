/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderParagraphComponent} from './paragraph.component';
import {SuiPlaceholderLineComponent} from './line.component';

@NgModule({
  declarations: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent, SuiPlaceholderLineComponent],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent, SuiPlaceholderLineComponent]
})
export class SuiPlaceholderModule {
}
