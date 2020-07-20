/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCommentContent]'
})
export class SuiCommentContentDirective {
  @HostBinding('class')
  get classes(): string {
    return ['content'].joinWithWhitespaceCleanup();
  }
}
