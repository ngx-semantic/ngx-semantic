/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiCommentAvatar',
  selector: '[suiCommentAvatar]'
})
export class SuiCommentAvatarDirective {
  @HostBinding('class')
  get classes(): string {
    return 'avatar';
  }
}
