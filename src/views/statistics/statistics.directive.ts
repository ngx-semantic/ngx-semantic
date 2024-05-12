/**
 * Created by bolor on 7/16/2020
 */

import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiWidth } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';
import { element } from 'protractor';

@Directive({
  selector: '[sui-statistics]',
  exportAs: 'suiStatistics'
})
export class SuiStatisticsDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiHorizontal = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  override get classes(): string {
    return [
      'ui',
      this.suiWidth,
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      'statistics'
    ].join(' ');
  }
}
