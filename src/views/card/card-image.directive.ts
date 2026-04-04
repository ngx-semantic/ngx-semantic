import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiCardImage]',
  exportAs: 'suiCardImage'
})
export class SuiCardImageDirective {
  @HostBinding('class')
  get classes(): string {
    return 'image';
  }
}
