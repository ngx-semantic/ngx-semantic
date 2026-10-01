/**
 * Created by bolor on 5/8/2020
 */

import { Directive, Input } from '@angular/core';
import { SuiHorizontalPosition, SuiSize } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiRailCloseness = 'close' | 'very close' | null;

@Directive({
  standalone: true,
  selector: 'div[sui-rail]',
  exportAs: 'suiRail'
})
export class SuiRailDirective extends BaseDirective {
  @Input() public suiLocation: SuiHorizontalPosition = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiCloseness: SuiRailCloseness = null;
  @Input() @InputBoolean() public suiInternal = false;
  @Input() @InputBoolean() public suiDividing = false;
  @Input() @InputBoolean() public suiAttached = false;

  get classes(): string {
    return [
      'ui',
      this.suiLocation,
      ClassUtils.getPropClass(this.suiInternal, 'internal'),
      ClassUtils.getPropClass(this.suiDividing, 'dividing'),
      ClassUtils.getPropClass(this.suiAttached, 'attached'),
      this.suiCloseness,
      this.suiSize,
      'rail'
    ].join(' ');
  }
}
