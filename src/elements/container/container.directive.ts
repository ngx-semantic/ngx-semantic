/**
 * Created by bolor on 9/22/2020
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiContainerAlignment = 'left aligned' | 'right aligned' | 'center aligned' | 'justified' | null;

@Directive({
  standalone: true,
  selector: '[sui-container]',
  exportAs: 'suiContainer'
})
export class SuiContainerDirective extends BaseDirective {
  @Input() public suiAlignment: SuiContainerAlignment = null;
  @Input() @InputBoolean() public suiText = false;
  @Input() @InputBoolean() public suiFluid = false;

  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      ClassUtils.getPropClass(this.suiText, 'text'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      'container'
    ].join(' ');
  }
}
