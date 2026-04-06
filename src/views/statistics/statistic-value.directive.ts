/**
 * Created by bolor on 7/16/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiStatValue',
  selector: '[suiStatValue]'
})
export class SuiStatisticValueDirective extends BaseDirective {
  @Input() @InputBoolean() public suiText = false;

  constructor() {
    const elementRef = inject(ElementRef);

    super(elementRef);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiText, 'text'),
      'value'
    ].join(' ');
  }
}
