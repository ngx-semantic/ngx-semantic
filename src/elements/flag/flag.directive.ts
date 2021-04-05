import {Directive, HostBinding, Input} from '@angular/core';
import 'ngx-semantic/core/util';

@Directive({
  selector: '[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective {
  @Input() public suiCountry = '';

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].joinWithWhitespaceCleanup();
  }
}
