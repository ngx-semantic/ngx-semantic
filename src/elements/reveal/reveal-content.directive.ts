/**
 * Created by bolor on 5/17/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

export type SuiRevealContentVisibility = 'visible' | 'hidden';

@Directive({
  exportAs: 'suiRevealContent',
  selector: '[suiRevealContent]'
})
export class SuiRevealContentDirective {
  @Input() public suiVisible: SuiRevealContentVisibility = 'visible';

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiVisible,
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
