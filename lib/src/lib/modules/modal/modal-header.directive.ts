/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[suiModalHeader]',
  exportAs: 'suiModalHeader'
})
export class SuiModalHeaderDirective {
  @Input() @InputBoolean() public suiIcon: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiIcon, 'ui icon'),
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
