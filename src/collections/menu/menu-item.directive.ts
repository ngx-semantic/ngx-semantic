/**
 * Created by bolor on 7/3/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiMenuItem',
  selector: '[suiMenuItem]'
})
export class SuiMenuItemDirective extends BaseDirective {
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public suiBrowser = false;
  @Input() @InputBoolean() public disabled = false;

  constructor() {
    const element = inject(ElementRef);

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
