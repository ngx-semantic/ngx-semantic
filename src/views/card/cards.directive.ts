/**
 * Created by bolor on 8/17/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiWidth} from 'ngx-semantic/core/enums';

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
      ClassUtils.getPropClass(this.suiLink, 'link'),
      ClassUtils.getPropClass(this.suiStackable, 'stackable'),
      ClassUtils.getPropClass(this.suiDoubling, 'doubling'),
      'cards'
    ].join(' ');
  }
}
