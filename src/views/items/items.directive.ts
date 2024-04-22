/**
 * Created by bolor on 8/2/2020
 */

import {Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiItemsRelaxation = 'relaxed' | 'very relaxed' | null;

@Directive({
  selector: '[sui-items]',
  exportAs: 'suiItems'
})
export class SuiItemsDirective extends BaseDirective {
  @Input() public suiRelaxed: SuiItemsRelaxation = null;
  @Input() @InputBoolean() public suiDivided = false;
  @Input() @InputBoolean() public suiUnstackable = false;
  @Input() @InputBoolean() public suiLink = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiRelaxed,
      ClassUtils.getPropClass(this.suiDivided, 'divided'),
      ClassUtils.getPropClass(this.suiUnstackable, 'unstackable'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      'items'
    ].join(' ');
  }
}
