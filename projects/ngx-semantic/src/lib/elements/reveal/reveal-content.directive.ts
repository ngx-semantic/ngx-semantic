/**
 * Created by bolor on 5/17/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

export type SuiRevealContentVisibility = 'visible' | 'hidden';

@Directive({
  selector: '[sui-reveal-content]'
})
export class SuiRevealContentDirective {
  @Input() suiVisible: SuiRevealContentVisibility = 'visible';

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiVisible,
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
