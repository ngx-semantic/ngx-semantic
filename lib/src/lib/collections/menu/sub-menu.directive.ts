/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[suiSubMenu]',
  exportAs: 'suiSubMenu'
})
export class SuiSubMenuDirective {
  @Input() @InputBoolean() public suiRight = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiRight, 'right'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
