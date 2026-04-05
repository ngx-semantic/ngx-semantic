/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiCommentReply',
  selector: '[suiCommentReply]'
})
export class SuiCommentReplyDirective {
  @HostBinding('class')
  get classes(): string {
    return 'reply';
  }
}
