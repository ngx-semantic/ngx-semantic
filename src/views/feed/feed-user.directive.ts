/**
 * Created by bolor on 7/28/2020
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  exportAs: 'suiFeedUser',
  selector: '[suiFeedUser]'
})
export class SuiFeedUserDirective {
  @HostBinding('class')
  get classes(): string {
    return 'user';
  }
}
