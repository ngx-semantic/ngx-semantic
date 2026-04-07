/**
 * Created by bolor on 7/16/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiColour, SuiSize } from 'ngx-semantic/core/enums';
import { SuiStatisticsDirective } from './statistics.directive';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiFloat = 'right' | 'left';

@Directive({
  standalone: true,
  selector: '[sui-statistic]',
  exportAs: 'suiStatistic'
})
export class SuiStatisticDirective extends BaseDirective {
  private parent = inject(SuiStatisticsDirective, { optional: true, host: true });

  @Input() public suiColour: SuiColour = null;
  @Input() public suiFloated: SuiFloat | null = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiInverted = false;

  private isChildComponent: boolean;

  constructor() {
    const elementRef = inject(ElementRef);

    super(elementRef);
    const parent = this.parent;
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
