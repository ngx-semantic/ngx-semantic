/**
 * Created by bolor on 5/17/2020
 */

import { Directive, Input } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiRevealContentVisibility = 'visible' | 'hidden';

@Directive({
  standalone: true,
  exportAs: 'suiRevealContent',
  selector: '[suiRevealContent]'
})
export class SuiRevealContentDirective extends BaseDirective {
  @Input() public suiVisible: SuiRevealContentVisibility = 'visible';

  get classes(): string {
    return [
      this.suiVisible,
      'content'
    ].join(' ');
  }
}
