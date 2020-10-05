/**
 * Created by bolor on 8/2/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiItem',
  selector: '[suiItem]'
})
export class SuiItemDirective {
  @HostBinding('class')
  get classes(): string {
    return ['item'].joinWithWhitespaceCleanup();
  }
}
