/**
 * Created by bolor on 5/23/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[sui-segments]'
})
export class SuiSegmentsDirective {
  @Input() public suiHorizontal = false;
  @Input() public suiRaised = false;
  @Input() public suiStacked = false;
  @Input() public suiPiled = false;

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
