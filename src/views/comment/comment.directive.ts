/**
 * Created by bolor on 7/20/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[sui-comment]',
  exportAs: 'suiComment'
})
export class SuiCommentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'comment';
  }
}
