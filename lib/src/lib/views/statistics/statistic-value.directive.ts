/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'suiStatValue'
})
export class SuiStatisticValueDirective {
  @HostBinding('class')
  get classes(): string {
    return ['value'].joinWithWhitespaceCleanup();
  }
}
