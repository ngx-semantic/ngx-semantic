/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCommentText]',
  exportAs: 'suiCommentText'
})
export class SuiCommentTextDirective {
  @HostBinding('class')
  get classes(): string {
    return ['text'].joinWithWhitespaceCleanup();
  }
}
