/**
 * Created by bolor on 8/2/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiItemsRelaxation = 'relaxed' | 'very relaxed' | null;

@Directive({
  selector: '[sui-items]',
  exportAs: 'suiItems'
})
export class SuiItemsDirective {
  @Input() public suiRelaxed: SuiItemsRelaxation = null;
  @Input() @InputBoolean() public suiDivided = false;
  @Input() @InputBoolean() public suiUnstackable = false;
  @Input() @InputBoolean() public suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiRelaxed,
      Utils.getPropClass(this.suiDivided, 'divided'),
      Utils.getPropClass(this.suiUnstackable, 'unstackable'),
      Utils.getPropClass(this.suiLink, 'link'),
      'items'
    ].joinWithWhitespaceCleanup();
  }
}
