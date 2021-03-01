import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCardHeader]',
  exportAs: 'suiCardHeader'
})
export class SuiCardHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
