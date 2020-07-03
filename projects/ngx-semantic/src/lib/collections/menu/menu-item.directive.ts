/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[sui-menu-item]'
})
export class SuiMenuItemDirective {
  @Input() suiActive = false;
  @Input() suiBrowser = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiBrowser, 'browser'),
      'item'
    ].joinWithWhitespaceCleanup();
  }
}
