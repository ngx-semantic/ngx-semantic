import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiMessageList',
  selector: '[suiMessageList]'
})
export class SuiMessageListDirective {
  @HostBinding('class')
  get classes(): string {
    return 'list';
  }
}
