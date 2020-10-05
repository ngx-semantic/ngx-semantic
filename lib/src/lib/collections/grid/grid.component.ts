/**
 * Created by bolor on 6/11/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

export type SuiGridAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;
export type SuiGridDivision = 'divided' | 'vertically divided' | null;
export type SuiGridCellType = 'celled' | 'internally celled' | null;
export type SuiGridPadding = 'padding' | 'vertically padding' | null;
export type SuiGridReverse = 'computer reversed' | 'tablet reversed' | 'mobile reversed' | null;
export type SuiGridRelaxation = 'relaxed' | 'very relaxed' | null;

@Component({
  selector: '[sui-grid]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiGridComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAlignment: SuiGridAlignment = null;
  @Input() suiDivided: SuiGridDivision = null;
  @Input() suiCelled: SuiGridCellType = null;
  @Input() suiPadded: SuiGridPadding = null;
  @Input() suiReversed: SuiGridReverse = null;
  @Input() suiRelaxation: SuiGridRelaxation = null;
  @Input() suiEqual = false;
  @Input() suiCentered = false;
  @Input() suiContainer = false;
  @Input() suiStackable = false;
  @Input() suiDoubling = false;

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
      Utils.getPropClass(this.suiStackable, 'stackable'),
      Utils.getPropClass(this.suiEqual, 'equal width'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiDoubling, 'doubling'),
      'grid',
      Utils.getPropClass(this.suiContainer, 'container'),
    ].joinWithWhitespaceCleanup();
  }
}
