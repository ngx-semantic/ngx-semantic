/**
 * Created by bolor on 7/28/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiFeedEvent',
  selector: '[suiFeedEvent]'
})
export class SuiFeedEventDirective {
  @HostBinding('class')
  get classes(): string {
    return 'event';
  }
}
