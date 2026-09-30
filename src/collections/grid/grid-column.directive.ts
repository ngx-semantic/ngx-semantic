/**
 * Created by bolor on 6/14/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiColour, SuiDeviceVisibility, SuiWidth } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';
import { GridClassUtils, SuiGridTextAlignment, SuiGridVerticalAlignment } from './grid.types';

export type SuiColumnFloat = 'left floated' | 'right floated' | null;

/**
 * Text or vertical alignment for a column. `'middle aligned'`, `'top aligned'` and `'bottom aligned'` are kept here
 * for backwards compatibility; use `suiVerticalAlignment` when combining a text and a vertical alignment.
 */
export type SuiColumnAlignment = SuiGridTextAlignment | SuiGridVerticalAlignment;

@Directive({
  standalone: true,
  exportAs: 'suiGridColumn',
  selector: '[suiGridColumn]'
})
export class SuiGridColumnDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiMobileWidth: SuiWidth = null;
  @Input() public suiTabletWidth: SuiWidth = null;
  @Input() public suiComputerWidth: SuiWidth = null;
  @Input() public suiLargeScreenWidth: SuiWidth = null;
  @Input() public suiWidescreenWidth: SuiWidth = null;
  @Input() public suiFloated: SuiColumnFloat = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAlignment: SuiColumnAlignment = null;
  @Input() public suiVerticalAlignment: SuiGridVerticalAlignment = null;
  @Input() public suiDeviceVisibility: SuiDeviceVisibility = null;
  @Input() @InputBoolean() public suiStretched = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiFloated,
      this.suiAlignment,
      this.suiVerticalAlignment,
      this.suiColour,
      this.suiDeviceVisibility,
      ClassUtils.getPropClass(this.suiStretched, 'stretched'),
      GridClassUtils.widthClass(this.suiWidth),
      GridClassUtils.widthClass(this.suiMobileWidth, 'mobile'),
      GridClassUtils.widthClass(this.suiTabletWidth, 'tablet'),
      GridClassUtils.widthClass(this.suiComputerWidth, 'computer'),
      GridClassUtils.widthClass(this.suiLargeScreenWidth, 'large screen'),
      GridClassUtils.widthClass(this.suiWidescreenWidth, 'widescreen'),
      'column'
    ].join(' ');
  }
}
