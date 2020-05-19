/**
 * Created by bolor on 5/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';

export type SuiRevealContentVisibility = 'visible' | 'hidden';

@Component({
  selector: '[sui-reveal-content]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiRevealContentComponent {
  @Input() suiVisible: SuiRevealContentVisibility = 'visible';

  @HostBinding('class')
  get classes(): string {
    return [this.suiVisible, 'content'].joinWithWhitespaceCleanup();
  }
}
