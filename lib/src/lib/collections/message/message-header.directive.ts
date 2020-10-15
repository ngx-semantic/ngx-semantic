import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiMessageHeader',
  selector: '[suiMessageHeader]',
})
export class SuiMessageHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'header',
    ].joinWithWhitespaceCleanup();
  }
}
