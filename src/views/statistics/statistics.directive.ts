/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiWidth} from 'ngx-semantic/core/enums';

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
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      'statistics'
    ].join(' ');
  }
}
