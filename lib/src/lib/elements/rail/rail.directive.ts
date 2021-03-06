/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiHorizontalPosition, SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiRailCloseness = 'close' | 'very close' | null;

@Directive({
  selector: 'div[sui-rail]',
  exportAs: 'suiRail'
})
export class SuiRailDirective {
  @Input() public suiLocation: SuiHorizontalPosition = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiCloseness: SuiRailCloseness = null;
  @Input() @InputBoolean() public suiInternal = false;
  @Input() @InputBoolean() public suiDividing = false;
  @Input() @InputBoolean() public suiAttached = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiLocation,
      Utils.getPropClass(this.suiInternal, 'internal'),
      Utils.getPropClass(this.suiDividing, 'dividing'),
      Utils.getPropClass(this.suiAttached, 'attached'),
      this.suiCloseness,
      this.suiSize,
      'rail'
    ].joinWithWhitespaceCleanup();
  }
}
