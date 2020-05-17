/**
 * Created by bolor on 5/8/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiHorizontalPosition, SuiSize, Utils} from '../common';

export type SuiRailCloseness = 'close' | 'very close' | null;

@Component({
  selector: 'div[sui-rail]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiRailComponent {
  @Input() suiLocation: SuiHorizontalPosition = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiCloseness: SuiRailCloseness = null;
  @Input() suiInternal = false;
  @Input() suiDividing = false;
  @Input() suiAttached = false;

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
    ].join(' ');
  }
}
