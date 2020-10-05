/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiDeviceVisibility, SuiWidth, Utils} from '../../common';

export type SuiRowAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;

@Directive({
  exportAs: 'suiGridRow',
  selector: '[suiGridRow]'
})
export class SuiGridRowDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAlignment: SuiRowAlignment = null;
  @Input() suiDeviceVisibility: SuiDeviceVisibility = null;
  @Input() suiEqual = false;
  @Input() suiCentered = false;

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
