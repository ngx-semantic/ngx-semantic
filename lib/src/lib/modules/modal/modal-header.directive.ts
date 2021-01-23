/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[suiModalHeader]',
  exportAs: 'suiModalHeader'
})
export class SuiModalHeaderDirective {
  @Input() public suiIcon: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiIcon, 'ui icon'),
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
