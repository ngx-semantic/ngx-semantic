import {Directive, ElementRef, Input} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  selector: '[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective extends BaseDirective {
  @Input() public suiCountry = '';

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].join(' ');
  }
}
