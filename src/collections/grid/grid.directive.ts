/**
 * Created by bolor on 6/11/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiGridAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;
export type SuiGridDivision = 'divided' | 'vertically divided' | null;
export type SuiGridCellType = 'celled' | 'internally celled' | null;
export type SuiGridPadding = 'padding' | 'vertically padding' | null;
export type SuiGridReverse = 'computer reversed' | 'tablet reversed' | 'mobile reversed' | null;
export type SuiGridRelaxation = 'relaxed' | 'very relaxed' | null;

@Directive({
  selector: '[sui-grid]',
  exportAs: 'suiGrid'
})
export class SuiGridDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAlignment: SuiGridAlignment = null;
  @Input() public suiDivided: SuiGridDivision = null;
  @Input() public suiCelled: SuiGridCellType = null;
  @Input() public suiPadded: SuiGridPadding = null;
  @Input() public suiReversed: SuiGridReverse = null;
  @Input() public suiRelaxation: SuiGridRelaxation = null;
  @Input() @InputBoolean() public suiEqual = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiContainer = false;
  @Input() @InputBoolean() public suiStackable = false;
  @Input() @InputBoolean() public suiDoubling = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      this.suiWidth ? 'column' : '',
      this.suiAlignment,
      this.suiDivided,
      this.suiCelled,
      this.suiPadded,
      this.suiReversed,
      this.suiRelaxation,
      ClassUtils.getPropClass(this.suiStackable, 'stackable'),
      ClassUtils.getPropClass(this.suiEqual, 'equal width'),
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiDoubling, 'doubling'),
      'grid',
      ClassUtils.getPropClass(this.suiContainer, 'container')
    ].joinWithWhitespaceCleanup();
  }
}
