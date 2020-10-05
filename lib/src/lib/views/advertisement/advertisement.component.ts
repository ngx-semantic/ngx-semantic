/**
 * Created by bolor on 7/9/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiAdType =
  'banner'
  | 'rectangle'
  | 'leaderboard'
  | 'page'
  | 'square button'
  | 'button'
  | 'skyscraper'
  | 'billboard'
  | 'panorama'
  | 'netboard'
  | null;

@Component({
  selector: '[sui-advertisement]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiAdvertisementComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiType: SuiAdType = null;
  @Input() suiVertical = false;
  @Input() suiHalf = false;
  @Input() suiWide = false;
  @Input() suiCentered = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiHalf, 'half'),
      Utils.getPropClass(this.suiWide, 'wide'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      this.suiType,
      'ad'
    ].joinWithWhitespaceCleanup();
  }
}
