/**
 * Created by bolor on 9/20/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[sui-step]',
  exportAs: 'suiStep'
})
export class SuiStepDirective {
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiCompleted = false;
  @Input() @InputBoolean() public suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiCompleted, 'completed'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      'step'
    ].join(' ');
  }
}
