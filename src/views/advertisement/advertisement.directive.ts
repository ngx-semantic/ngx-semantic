/**
 * Created by bolor on 7/9/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiSize} from 'ngx-semantic/core/enums';

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
export class SuiAdvertisementDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiType: SuiAdType = null;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiHalf = false;
  @Input() @InputBoolean() public suiTop = false;
  @Input() @InputBoolean() public suiWide = false;
  @Input() @InputBoolean() public suiSquare = false;
  @Input() @InputBoolean() public suiCentered = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiHalf, 'half'),
      ClassUtils.getPropClass(this.suiWide, 'wide'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      ClassUtils.getPropClass(this.suiTop, 'top'),
      ClassUtils.getPropClass(this.suiSquare, 'square'),
      this.suiType,
      'ad'
    ].joinWithWhitespaceCleanup();
  }
}
