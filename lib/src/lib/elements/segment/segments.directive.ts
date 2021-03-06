/**
 * Created by bolor on 5/23/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[sui-segments]',
  exportAs: 'suiSegments'
})
export class SuiSegmentsDirective {
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiRaised = false;
  @Input() @InputBoolean() public suiStacked = false;
  @Input() @InputBoolean() public suiPiled = false;

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
