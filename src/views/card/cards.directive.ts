/**
 * Created by bolor on 8/17/2020
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiWidth } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[sui-cards]',
  exportAs: 'suiCards'
})
export class SuiCardsDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiStackable = false;
  @Input() @InputBoolean() public suiDoubling = false;
  @Input() @InputBoolean() public suiLink = false;

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
