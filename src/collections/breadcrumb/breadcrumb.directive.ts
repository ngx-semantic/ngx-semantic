/**
 * Created by bolor on 5/26/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiSize } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[sui-breadcrumb]',
  exportAs: 'suiBreadcrumb'
})
export class SuiBreadcrumbDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'breadcrumb'
    ].join(' ');
  }
}
