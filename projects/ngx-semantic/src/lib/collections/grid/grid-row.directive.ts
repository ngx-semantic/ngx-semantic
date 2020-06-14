/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

export type SuiRowAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;

@Directive({
  selector: '[sui-grid-row]'
})
export class SuiGridRowDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAlignment: SuiRowAlignment = null;
  @Input() suiEqual = false;
  @Input() suiCentered = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      Utils.getPropClass(this.suiEqual, 'equal width'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      'row'
    ].joinWithWhitespaceCleanup();
  }
}
