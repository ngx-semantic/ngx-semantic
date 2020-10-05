import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiMessageContent]'
})
export class SuiMessageContentDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
