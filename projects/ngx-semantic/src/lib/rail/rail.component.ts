/**
 * Created by bolor on 5/8/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiHorizontalPosition, SuiSize} from '../common';

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
      this.getPropClass(this.suiInternal, 'internal'),
      this.getPropClass(this.suiDividing, 'dividing'),
      this.getPropClass(this.suiAttached, 'attached'),
      this.suiCloseness,
      this.suiSize,
      'rail'
    ].join(' ');
  }

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
