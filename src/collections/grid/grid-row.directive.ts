/**
 * Created by bolor on 6/14/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiColour, SuiDeviceVisibility, SuiWidth } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';
import { GridClassUtils, SuiGridReverse, SuiGridTextAlignment, SuiGridVerticalAlignment } from './grid.types';

/**
 * Text or vertical alignment for a row. `'middle aligned'`, `'top aligned'` and `'bottom aligned'` are kept here for
 * backwards compatibility; use `suiVerticalAlignment` when combining a text and a vertical alignment.
 */
export type SuiRowAlignment = SuiGridTextAlignment | SuiGridVerticalAlignment;

@Directive({
  standalone: true,
  exportAs: 'suiGridRow',
  selector: '[suiGridRow]'
})
export class SuiGridRowDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAlignment: SuiRowAlignment = null;
  @Input() public suiVerticalAlignment: SuiGridVerticalAlignment = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiReversed: SuiGridReverse | SuiGridReverse[] = null;
  @Input() public suiDeviceVisibility: SuiDeviceVisibility = null;
  @Input() @InputBoolean() public suiEqual = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiStretched = false;
  @Input() @InputBoolean() public suiDoubling = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiAlignment,
      this.suiVerticalAlignment,
      this.suiColour,
      GridClassUtils.reversedClass(this.suiReversed),
      this.suiDeviceVisibility,
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiStretched, 'stretched'),
      ClassUtils.getPropClass(this.suiDoubling, 'doubling'),
      ClassUtils.getPropClass(this.suiEqual, 'equal width'),
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      'row'
    ].join(' ');
  }
}
