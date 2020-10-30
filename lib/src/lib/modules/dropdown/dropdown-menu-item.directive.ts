/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'item'
    ].joinWithWhitespaceCleanup();
  }
}
