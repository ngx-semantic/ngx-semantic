/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

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
  get classes(): string {
    return [
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiBrowser, 'browser'),
      Utils.getPropClass(this.disabled, 'disabled'),
      'item'
    ].joinWithWhitespaceCleanup();
  }
}
