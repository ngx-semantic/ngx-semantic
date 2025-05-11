/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiCommentAuthor',
  selector: '[suiCommentAuthor]'
})
export class SuiCommentAuthorDirective {
  @HostBinding('class')
  get classes(): string {
    return 'author';
  }
}
