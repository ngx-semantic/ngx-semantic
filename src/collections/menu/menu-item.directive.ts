/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiMenuItem',
  selector: '[suiMenuItem]'
})
export class SuiMenuItemDirective {
  @Input() public suiLink = false;
  @Input() public suiActive = false;
  @Input() public suiBrowser = false;
  @Input() public disabled = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.suiLink, 'link'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiBrowser, 'browser'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      'item'
    ];
  }
}
