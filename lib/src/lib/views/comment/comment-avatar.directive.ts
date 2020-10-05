/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCommentAvatar]',
  exportAs: 'suiCommentAvatar'
})
export class SuiCommentAvatarDirective {
  @HostBinding('class')
  get classes(): string {
    return ['avatar'].joinWithWhitespaceCleanup();
  }
}
