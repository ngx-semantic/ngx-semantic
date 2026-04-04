/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiDropdownMenuDivider]'
})
export class SuiDropdownMenuDividerDirective {
  @HostBinding('class')
  get classes(): string {
    return 'divider';
  }
}
