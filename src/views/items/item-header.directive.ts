import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiItemHeader',
  selector: '[suiItemHeader]'
})
export class SuiItemHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return 'header';
  }
}
