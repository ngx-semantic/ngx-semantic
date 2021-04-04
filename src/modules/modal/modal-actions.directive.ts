/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiModalActions]',
  exportAs: 'suiModalActions'
})
export class SuiModalActionsDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'actions'
    ].joinWithWhitespaceCleanup();
  }
}
