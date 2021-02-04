/**
 * Created by bolor on 8/17/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[sui-cards]',
  exportAs: 'suiCards'
})
export class SuiCardsDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiStackable = false;
  @Input() @InputBoolean() public suiDoubling = false;
  @Input() @InputBoolean() public suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiStackable, 'stackable'),
      Utils.getPropClass(this.suiDoubling, 'doubling'),
      'cards'
    ].joinWithWhitespaceCleanup();
  }
}
