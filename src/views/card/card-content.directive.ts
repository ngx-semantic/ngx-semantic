import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCardContent]',
  exportAs: 'suiCardContent'
})
export class SuiCardContentDirective {
  @HostBinding('class')
  get classes(): string {
    return ['content'].joinWithWhitespaceCleanup();
  }
}
