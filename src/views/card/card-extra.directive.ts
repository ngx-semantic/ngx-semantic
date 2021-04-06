import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCardExtra]',
  exportAs: 'suiCardExtra'
})
export class SuiCardExtraContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'extra content';
  }
}
