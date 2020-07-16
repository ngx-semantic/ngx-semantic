/**
 * Created by bolor on 7/16/2020
 */

import {Component, Host, HostBinding, Optional} from '@angular/core';
import {SuiStatisticGroupComponent} from './statistic-group.component';

@Component({
  selector: '[sui-statistic]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticComponent {
  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      'statistic'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiStatisticGroupComponent) {
    this.isChildComponent = !!parent;
  }
}
