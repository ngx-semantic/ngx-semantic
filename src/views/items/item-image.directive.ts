import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiItemImage',
  selector: '[suiItemImage]'
})
export class SuiItemImageDirective {
  @HostBinding('class')
  get classes(): string {
    return 'image';
  }
}
