/**
 * Created by bolor on 7/20/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiCommentActionsDirective} from './comment-actions.directive';
import {SuiCommentAvatarDirective} from './comment-avatar.directive';
import {SuiCommentAuthorDirective} from './comment-author.directive';
import {SuiCommentContentDirective} from './comment-content.directive';
import {SuiCommentMetadataDirective} from './comment-metadata.directive';
import {SuiCommentTextDirective} from './comment-text.directive';
import {SuiCommentDirective} from './comment.directive';
import {SuiCommentsDirective} from './comments.directive';
import {SuiCommentReplyDirective} from './comment-reply.directive';

@NgModule({
  imports: [
    CommonModule,
    SuiCommentDirective,
    SuiCommentsDirective,
    SuiCommentActionsDirective,
    SuiCommentAuthorDirective,
    SuiCommentAvatarDirective,
    SuiCommentMetadataDirective,
    SuiCommentContentDirective,
    SuiCommentTextDirective,
    SuiCommentReplyDirective
  ],
  exports: [
    SuiCommentDirective,
    SuiCommentsDirective,
    SuiCommentActionsDirective,
    SuiCommentAuthorDirective,
    SuiCommentAvatarDirective,
    SuiCommentMetadataDirective,
    SuiCommentContentDirective,
    SuiCommentTextDirective,
    SuiCommentReplyDirective
  ]
})
export class SuiCommentModule {
}
