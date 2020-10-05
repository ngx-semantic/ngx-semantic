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
  @Input() suiActive = false;
  @Input() suiBrowser = false;
  @Input() suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiBrowser, 'browser'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'item'
    ].joinWithWhitespaceCleanup();
  }
}
