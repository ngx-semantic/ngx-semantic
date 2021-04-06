/**
 * Created by bolor on 9/22/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiContainerAlignment = 'left aligned' | 'right aligned' | 'center aligned' | 'justified' | null;

@Directive({
  selector: '[sui-container]',
  exportAs: 'suiContainer'
})
export class SuiContainerDirective {
  @Input() public suiAlignment: SuiContainerAlignment = null;
  @Input() @InputBoolean() public suiText = false;
  @Input() @InputBoolean() public suiFluid = false;

  @HostBinding('class')
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
