/**
 * Created by bolor on 7/16/2020
 */

import {Component, Host, HostBinding, Input, Optional} from '@angular/core';
import {SuiStatisticGroupComponent} from './statistic-group.component';
import {SuiColour, SuiSize, Utils} from '../../common';

export type SuiFloat = 'right' | 'left';

@Component({
  selector: '[sui-statistic]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiFloated: SuiFloat = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiHorizontal = false;
  @Input() suiInverted = false;

  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiSize,
      this.suiColour,
      this.suiFloated ? `${this.suiFloated} floated` : '',
      Utils.getPropClass(this.suiHorizontal, 'horizontal'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'statistic'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiStatisticGroupComponent) {
    this.isChildComponent = !!parent;
  }
}
