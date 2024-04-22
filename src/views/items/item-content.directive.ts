import {Directive, ElementRef, Input} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiItemContentAlignment = 'middle aligned' | 'bottom aligned' | null;

@Directive({
  exportAs: 'suiItemContent',
  selector: '[suiItemContent]'
})
export class SuiItemContentDirective extends BaseDirective {
  @Input() public suiAlignment: SuiItemContentAlignment = null;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiAlignment,
      'content'
    ].join(' ');
  }
}
