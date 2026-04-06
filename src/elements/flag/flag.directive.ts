import { Directive, ElementRef, Input, inject } from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: 'i[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective extends BaseDirective {
  @Input() public suiCountry = '';

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].join(' ');
  }
}
