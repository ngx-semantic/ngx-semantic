import {Directive, ElementRef, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemExtra',
  selector: '[suiItemExtra]'
})
export class SuiItemExtraContentDirective extends BaseDirective {
  @HostBinding('class')
  get classes(): string {
    return 'extra';
  }

  constructor(element: ElementRef) {
    super(element);
  }
}
