/**
 * Created by bolor on 7/9/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

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
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiHalf, 'half'),
      Utils.getPropClass(this.suiWide, 'wide'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      Utils.getPropClass(this.suiTop, 'top'),
      Utils.getPropClass(this.suiSquare, 'square'),
      this.suiType,
      'ad'
    ].joinWithWhitespaceCleanup();
  }
}
