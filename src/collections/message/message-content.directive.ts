import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiMessageContent',
  selector: '[suiMessageContent]'
})
export class SuiMessageContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'content';
  }
}
