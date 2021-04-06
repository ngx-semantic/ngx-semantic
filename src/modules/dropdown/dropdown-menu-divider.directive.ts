/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiDropdownMenuDivider]'
})
export class SuiDropdownMenuDividerDirective {
  @HostBinding('class')
  get classes(): string {
    return 'divider';
  }
}
