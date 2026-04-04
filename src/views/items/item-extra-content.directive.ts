import { Directive, HostBinding } from '@angular/core';

@Directive({
  exportAs: 'suiItemExtra',
  selector: '[suiItemExtra]'
})
export class SuiItemExtraContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'extra';
  }
}
