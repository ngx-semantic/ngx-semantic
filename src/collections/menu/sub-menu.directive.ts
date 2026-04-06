/**
 * Created by bolor on 7/3/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[suiSubMenu]',
  exportAs: 'suiSubMenu'
})
export class SuiSubMenuDirective extends BaseDirective {
  @Input() @InputBoolean() public suiRight = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiRight, 'right'),
      'menu'
    ].join(' ');
  }
}
