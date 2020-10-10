/**
 * Created by bolor on 10/10/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiWidth, Utils} from '../../common';

export type SuiTableBasicType = 'basic' | 'very basic' | null;
export type SuiTablePadding = 'padded' | 'very padded' | null;
export type SuiTableCompactness = 'compact' | 'very compact' | null;
export type SuiTableSize = 'small' | 'large' | null;

@Component({
  selector: '[sui-table]',
  template: `
    <ng-content></ng-content>
  `,
})
export class SuiTableComponent {
  @Input() public suiBasic: SuiTableBasicType = null;
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiPadded: SuiTablePadding = null;
  @Input() public suiCompact: SuiTableCompactness = null;
  @Input() public suiSize: SuiTableSize = null;
  @Input() public suiCelled = false;
  @Input() public suiStriped = false;
  @Input() public suiDefinition = false;
  @Input() public suiStructured = false;
  @Input() public suiSingleLine = false;
  @Input() public suiFixed = false;
  @Input() public suiSelectable = false;
  @Input() public suiInverted = false;
  @Input() public suiCollapsing = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiBasic,
      this.suiPadded,
      this.suiCompact,
      this.suiSize,
      this.suiWidth ? 'column' : '',
      Utils.getPropClass(this.suiSelectable, 'selectable'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiColour,
      Utils.getPropClass(this.suiCelled, 'celled'),
      Utils.getPropClass(this.suiStriped, 'striped'),
      Utils.getPropClass(this.suiDefinition, 'definition'),
      Utils.getPropClass(this.suiStructured, 'structured'),
      Utils.getPropClass(this.suiFixed, 'fixed'),
      Utils.getPropClass(this.suiSingleLine, 'single line'),
      Utils.getPropClass(this.suiCollapsing, 'collapsing'),
      'table',
    ].joinWithWhitespaceCleanup();
  }
}
