/**
 * Created by bolor on 5/23/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[sui-segments]',
  exportAs: 'suiSegments'
})
export class SuiSegmentsDirective {
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiRaised = false;
  @Input() @InputBoolean() public suiStacked = false;
  @Input() @InputBoolean() public suiPiled = false;
  @Input() @InputBoolean() public suiCompact = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      ClassUtils.getPropClass(this.suiRaised, 'raised'),
      ClassUtils.getPropClass(this.suiStacked, 'stacked'),
      ClassUtils.getPropClass(this.suiPiled, 'piled'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      'segments'
    ].join(' ');
  }
}
