/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[suiSubMenu]'
})
export class SuiSubMenuDirective {
  @Input() suiRight = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiRight, 'right'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
