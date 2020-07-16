/**
 * Created by bolor on 7/16/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-statistic]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'statistic'
    ].joinWithWhitespaceCleanup();
  }
}
