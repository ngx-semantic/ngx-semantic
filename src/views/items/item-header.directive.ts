import {Directive, ElementRef, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemHeader',
  selector: '[suiItemHeader]'
})
export class SuiItemHeaderDirective extends BaseDirective {
  @HostBinding('class')
  get classes(): string {
    return 'header';
  }

  constructor(element: ElementRef) {
    super(element);
  }
}
