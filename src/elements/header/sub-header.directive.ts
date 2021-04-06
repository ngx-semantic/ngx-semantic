/**
 * Created by bolor on 5/19/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiSubHeader]',
  exportAs: 'suiSubHeader'
})
export class SuiSubHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return 'sub header';
  }
}
