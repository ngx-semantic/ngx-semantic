/**
 * Created by bolor on 7/28/2020
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  exportAs: 'suiFeedDate',
  selector: '[suiFeedDate]'
})
export class SuiFeedDateDirective {
  @HostBinding('class')
  get classes(): string {
    return 'date';
  }
}
