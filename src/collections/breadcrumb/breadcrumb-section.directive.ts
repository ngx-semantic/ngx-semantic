/**
 * Created by bolor on 5/26/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiBreadcrumbSection',
  selector: '[suiBreadcrumbSection]'
})
export class SuiBreadcrumbSectionDirective extends BaseDirective {
  @Input() @InputBoolean() public suiActive = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.getActive(),
      'section'
    ].join(' ');
  }

  public getActive(): string {
    if (this.suiActive) {
      return 'active';
    }

    return '';
  }
}
