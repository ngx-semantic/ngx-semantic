/**
 * Created by bolor on 5/6/2020
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[sui-placeholder]',
  exportAs: 'suiPlaceholder'
})
export class SuiPlaceholderDirective extends BaseDirective {
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFluid = false;

  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'placeholder'
    ].join(' ');
  }
}
