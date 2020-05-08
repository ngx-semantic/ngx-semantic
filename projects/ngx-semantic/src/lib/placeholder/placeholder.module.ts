/**
 * Created by bolor on 5/6/2020
 */

import {NgModule} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';
import {CommonModule} from '@angular/common';
import {SuiPlaceholderParagraphComponent} from './paragraph.component';

@NgModule({
  declarations: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent],
  imports: [CommonModule],
  exports: [SuiPlaceholderComponent, SuiPlaceholderParagraphComponent]
})
export class SuiPlaceholderModule {
}
