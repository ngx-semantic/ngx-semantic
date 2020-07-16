/**
 * Created by bolor on 7/16/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-statistic-group]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticGroupComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'statistics'
    ].joinWithWhitespaceCleanup();
  }
}
