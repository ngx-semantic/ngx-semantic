/**
 * Created by bolor on 7/28/2020
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  exportAs: 'suiFeedMeta',
  selector: '[suiFeedMeta]'
})
export class SuiFeedMetaDirective {
  @HostBinding('class')
  get classes(): string {
    return 'meta';
  }
}
