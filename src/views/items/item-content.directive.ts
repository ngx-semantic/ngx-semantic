import { Directive, ElementRef, Input, inject } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiItemContentAlignment = 'middle aligned' | 'bottom aligned' | null;

@Directive({
  standalone: true,
  exportAs: 'suiItemContent',
  selector: '[suiItemContent]'
})
export class SuiItemContentDirective extends BaseDirective {
  @Input() public suiAlignment: SuiItemContentAlignment = null;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiAlignment,
      'content'
    ].join(' ');
  }
}
