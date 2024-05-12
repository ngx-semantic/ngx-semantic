/**
 * Created by bolor on 7/16/2020
 */

import { Directive, ElementRef, Host, HostBinding, Input, Optional } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiColour, SuiSize } from 'ngx-semantic/core/enums';
import { SuiStatisticsDirective } from './statistics.directive';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiFloat = 'right' | 'left';

@Directive({
  selector: '[sui-statistic]',
  exportAs: 'suiStatistic'
})
export class SuiStatisticDirective extends BaseDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() public suiFloated: SuiFloat = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiInverted = false;

  private isChildComponent: boolean;

  constructor(@Optional() @Host() private parent: SuiStatisticsDirective, private elementRef: ElementRef) {
    super(elementRef);
    this.isChildComponent = !!parent;
  }

  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiSize,
      this.suiColour,
      this.suiFloated ? `${this.suiFloated} floated` : '',
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'statistic'
    ].join(' ');
  }
}
