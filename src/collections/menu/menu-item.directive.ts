/**
 * Created by bolor on 7/3/2020
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { ClassUtils } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiMenuItem',
  selector: '[suiMenuItem]'
})
export class SuiMenuItemDirective extends BaseDirective {
  @Input() public suiLink = false;
  @Input() public suiActive = false;
  @Input() public suiBrowser = false;
  @Input() public disabled = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiLink, 'link'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiBrowser, 'browser'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      'item'
    ].join(' ');
  }
}
