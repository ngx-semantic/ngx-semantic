/**
 * Created by bolor on 7/3/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiMenuHeader',
  selector: '[suiMenuHeader]'
})
export class SuiMenuHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return ['header'].joinWithWhitespaceCleanup();
  }
}
