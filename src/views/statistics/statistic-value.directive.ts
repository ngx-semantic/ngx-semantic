/**
 * Created by bolor on 7/16/2020
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiStatValue',
  selector: '[suiStatValue]'
})
export class SuiStatisticValueDirective extends BaseDirective {
  @Input() @InputBoolean() public suiText = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiText, 'text'),
      'value'
    ].join(' ');
  }
}
