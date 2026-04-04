import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiItemImage',
  selector: '[suiItemImage]'
})
export class SuiItemImageDirective {
  @HostBinding('class')
  get classes(): string {
    return 'image';
  }
}
