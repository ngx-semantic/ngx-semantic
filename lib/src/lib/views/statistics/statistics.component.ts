/**
 * Created by bolor on 7/16/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Component({
  selector: '[sui-statistics]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStatisticsComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiHorizontal = false;

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
