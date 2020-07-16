/**
 * Created by bolor on 7/16/2020
 */

import {Component, Host, HostBinding, Input, Optional} from '@angular/core';
import {SuiStatisticGroupComponent} from './statistic-group.component';
import {SuiColour, Utils} from '../../common';

@Component({
  selector: '[sui-statistic]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiHorizontal = false;
  @Input() suiInverted = false;
  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiColour,
      Utils.getPropClass(this.suiHorizontal, 'horizontal'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'statistic'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiStatisticGroupComponent) {
    this.isChildComponent = !!parent;
  }
}
