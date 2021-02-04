/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiDeviceVisibility, SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiRowAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;

@Directive({
  exportAs: 'suiGridRow',
  selector: '[suiGridRow]'
})
export class SuiGridRowDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAlignment: SuiRowAlignment = null;
  @Input() public suiDeviceVisibility: SuiDeviceVisibility = null;
  @Input() @InputBoolean() public suiEqual = false;
  @Input() @InputBoolean() public suiCentered = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      this.suiDeviceVisibility,
      Utils.getPropClass(this.suiEqual, 'equal width'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      'row'
    ].joinWithWhitespaceCleanup();
  }
}
