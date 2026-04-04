/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiDropdownMenuHeader]'
})
export class SuiDropdownMenuHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return 'header';
  }
}
