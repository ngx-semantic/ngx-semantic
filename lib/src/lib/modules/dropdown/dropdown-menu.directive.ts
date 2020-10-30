/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenuDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
