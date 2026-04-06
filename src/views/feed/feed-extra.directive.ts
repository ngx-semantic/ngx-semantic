/**
 * Created by bolorundurowb on 4/27/2024
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiExtraType = 'text' | 'images';

@Directive({
  standalone: true,
  exportAs: 'suiFeedExtra',
  selector: '[suiFeedExtra]'
})
export class SuiFeedExtraDirective extends BaseDirective {
  @Input() suiExtraType: SuiExtraType | null = null;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      'extra',
      this.suiExtraType
    ].join(' ');
  }
}
