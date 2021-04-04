/**
 * Created by bolor on 7/16/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[sui-statistics]',
  exportAs: 'suiStatistics'
})
export class SuiStatisticsDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiHorizontal = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      Utils.getPropClass(this.suiHorizontal, 'horizontal'),
      'statistics'
    ].joinWithWhitespaceCleanup();
  }
}
