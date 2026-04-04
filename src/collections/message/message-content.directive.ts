import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiMessageContent',
  selector: '[suiMessageContent]'
})
export class SuiMessageContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'content';
  }
}
