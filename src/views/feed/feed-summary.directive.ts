/**
 * Created by bolor on 7/28/2020
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiFeedSummary',
  selector: '[suiFeedSummary]'
})
export class SuiFeedSummaryDirective {
  @HostBinding('class')
  get classes(): string {
    return 'summary';
  }
}
