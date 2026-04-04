/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiCommentText',
  selector: '[suiCommentText]'
})
export class SuiCommentTextDirective {
  @HostBinding('class')
  get classes(): string {
    return 'text';
  }
}
