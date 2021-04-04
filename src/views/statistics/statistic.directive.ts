/**
 * Created by bolor on 7/16/2020
 */

import {Component, Directive, Host, HostBinding, Input, Optional} from '@angular/core';
import {SuiColour, SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiStatisticsDirective} from './statistics.directive';

export type SuiFloat = 'right' | 'left';

@Directive({
  selector: '[sui-statistic]',
  exportAs: 'suiStatistic'
})
export class SuiStatisticDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() public suiFloated: SuiFloat = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiInverted = false;

  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiSize,
      this.suiColour,
      this.suiFloated ? `${this.suiFloated} floated` : '',
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'statistic'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiStatisticsDirective) {
    this.isChildComponent = !!parent;
  }
}
