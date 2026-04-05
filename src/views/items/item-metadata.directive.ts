import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiItemMeta',
  selector: '[suiItemMeta]'
})
export class SuiItemMetadataDirective {
  @HostBinding('class')
  get classes(): string {
    return 'meta';
  }
}
