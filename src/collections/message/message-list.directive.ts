import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiMessageList',
  selector: '[suiMessageList]'
})
export class SuiMessageListDirective {
  @HostBinding('class')
  get classes(): string {
    return 'list';
  }
}
