import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiMessageHeader]',
  exportAs: 'suiMessageHeader'
})
export class SuiMessageHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
