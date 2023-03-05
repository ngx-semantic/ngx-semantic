/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiStatValue',
  selector: '[suiStatValue]'
})
export class SuiStatisticValueDirective {
  @Input() @InputBoolean() public suiText = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiText, 'text'),
      'value'
    ].join(' ');
  }
}
