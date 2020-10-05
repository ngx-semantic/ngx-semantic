import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiMessageContent]',
  exportAs: 'suiMessageContent'
})
export class SuiMessageContentDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
