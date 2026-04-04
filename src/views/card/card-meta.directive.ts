import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiCardMeta]',
  exportAs: 'suiCardMeta'
})
export class SuiCardMetaDirective {
  @HostBinding('class')
  get classes(): string {
    return 'meta';
  }
}
