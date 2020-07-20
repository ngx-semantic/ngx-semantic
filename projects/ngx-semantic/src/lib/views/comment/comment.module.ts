/**
 * Created by bolor on 7/20/2020
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCommentComponent} from './comment.component';
import {SuiCommentsComponent} from './comments.component';
import {SuiCommentActionsDirective} from './comment-actions.directive';
import {SuiCommentAvatarDirective} from './comment-avatar.directive';
import {SuiCommentMetadataDirective} from './comment-metadata.directive';
import {SuiCommentContentDirective} from './comment-content.directive';
import {SuiCommentTextDirective} from './comment-text.directive';

@NgModule({
  declarations: [
    SuiCommentComponent,
    SuiCommentsComponent,
    SuiCommentActionsDirective,
    SuiCommentAvatarDirective,
    SuiCommentMetadataDirective,
    SuiCommentContentDirective,
    SuiCommentTextDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiCommentComponent,
    SuiCommentComponent,
    SuiCommentActionsDirective,
    SuiCommentAvatarDirective,
    SuiCommentMetadataDirective,
    SuiCommentContentDirective,
    SuiCommentTextDirective
  ]
})
export class SuiCommentModule {
}
