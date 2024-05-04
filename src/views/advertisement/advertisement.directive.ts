/**
 * Created by bolor on 7/9/2020
 */

import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiSize } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiAdType =
  'banner'
  | 'rectangle'
  | 'leaderboard'
  | 'page'
  | 'button'
  | 'skyscraper'
  | 'billboard'
  | 'panorama'
  | 'netboard'
  | null;

@Directive({
  selector: '[sui-advertisement]',
  exportAs: 'suiAdvertisement'
})
export class SuiAdvertisementDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiType: SuiAdType = null;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiHalf = false;
  @Input() @InputBoolean() public suiTop = false;
  @Input() @InputBoolean() public suiWide = false;
  @Input() @InputBoolean() public suiSquare = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiTest = false;
  @Input() @InputBoolean() public suiMobile = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiMobile, 'mobile'),
      this.suiSize,
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiHalf, 'half'),
      ClassUtils.getPropClass(this.suiWide, 'wide'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      ClassUtils.getPropClass(this.suiTop, 'top'),
      ClassUtils.getPropClass(this.suiSquare, 'square'),
      this.suiType,
      ClassUtils.getPropClass(this.suiTest, 'test'),
      'ad'
    ].join(' ');
  }
}
