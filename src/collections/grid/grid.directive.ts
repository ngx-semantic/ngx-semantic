/**
 * Created by bolor on 6/11/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiWidth } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';
import { GridClassUtils, SuiGridReverse, SuiGridTextAlignment, SuiGridVerticalAlignment } from './grid.types';

export type SuiGridAlignment = SuiGridTextAlignment;
export type SuiGridDivision = 'divided' | 'vertically divided' | null;
export type SuiGridCellType = 'celled' | 'internally celled' | null;
export type SuiGridPadding = 'padded' | 'vertically padded' | 'horizontally padded' | null;
export type SuiGridRelaxation = 'relaxed' | 'very relaxed' | null;

@Directive({
  standalone: true,
  selector: '[sui-grid]',
  exportAs: 'suiGrid'
})
export class SuiGridDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAlignment: SuiGridAlignment = null;
  @Input() public suiVerticalAlignment: SuiGridVerticalAlignment = null;
  @Input() public suiDivided: SuiGridDivision = null;
  @Input() public suiCelled: SuiGridCellType = null;
  @Input() public suiPadded: SuiGridPadding = null;
  @Input() public suiReversed: SuiGridReverse | SuiGridReverse[] = null;
  @Input() public suiRelaxation: SuiGridRelaxation = null;
  @Input() @InputBoolean() public suiEqual = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiContainer = false;
  @Input() @InputBoolean() public suiStackable = false;
  @Input() @InputBoolean() public suiDoubling = false;
  @Input() @InputBoolean() public suiStretched = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      this.suiVerticalAlignment,
      this.suiDivided,
      this.suiCelled,
      this.suiPadded,
      GridClassUtils.reversedClass(this.suiReversed),
      this.suiRelaxation,
      ClassUtils.getPropClass(this.suiStackable, 'stackable'),
      ClassUtils.getPropClass(this.suiDoubling, 'doubling'),
      ClassUtils.getPropClass(this.suiStretched, 'stretched'),
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiEqual, 'equal width'),
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      'grid',
      ClassUtils.getPropClass(this.suiContainer, 'container')
    ].join(' ');
  }
}
