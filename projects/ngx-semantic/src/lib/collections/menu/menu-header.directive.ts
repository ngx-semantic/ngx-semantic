/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[sui-menu-header]'
})
export class SuiMenuHeader {
  @HostBinding('class')
  get classes(): string {
    return ['header'].joinWithWhitespaceCleanup();
  }
}
