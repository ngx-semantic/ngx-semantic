/**
 * Created by bolor on 6/14/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiDeviceVisibility, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiRowAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;

@Directive({
  exportAs: 'suiGridRow',
  selector: '[suiGridRow]'
})
export class SuiGridRowDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAlignment: SuiRowAlignment = null;
  @Input() public suiDeviceVisibility: SuiDeviceVisibility = null;
  @Input() @InputBoolean() public suiEqual = false;
  @Input() @InputBoolean() public suiCentered = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      this.suiDeviceVisibility,
      ClassUtils.getPropClass(this.suiEqual, 'equal width'),
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      'row'
    ].join(' ');
  }
}
