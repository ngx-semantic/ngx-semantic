/**
 * Created by bolor on 7/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCommentComponent} from './comment.component';
import {SuiCommentsComponent} from './comments.component';

@NgModule({
  declarations: [SuiCommentComponent, SuiCommentsComponent],
  imports: [CommonModule],
  exports: [SuiCommentComponent, SuiCommentComponent]
})
export class SuiCommentModule {
}
