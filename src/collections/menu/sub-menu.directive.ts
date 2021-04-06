/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[suiSubMenu]',
  exportAs: 'suiSubMenu'
})
export class SuiSubMenuDirective {
  @Input() @InputBoolean() public suiRight = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiRight, 'right'),
      'menu'
    ].join(' ');
  }
}
