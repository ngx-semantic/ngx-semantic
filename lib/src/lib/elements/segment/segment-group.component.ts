/**
 * Created by bolor on 5/23/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: '[sui-segment-group]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSegmentGroupComponent {
  @Input() suiHorizontal = false;
  @Input() suiRaised = false;
  @Input() suiStacked = false;
  @Input() suiPiled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiHorizontal, 'horizontal'),
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiStacked, 'stacked'),
      Utils.getPropClass(this.suiPiled, 'piled'),
      'segments'
    ].joinWithWhitespaceCleanup();
  }
}
