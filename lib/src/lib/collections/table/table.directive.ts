/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiStacking, SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiTableBasicType = 'basic' | 'very basic' | null;
export type SuiTablePadding = 'padded' | 'very padded' | null;
export type SuiTableCompactness = 'compact' | 'very compact' | null;
export type SuiTableSize = 'small' | 'large' | null;

@Directive({
  selector: '[sui-table]',
  exportAs: 'suiTable'
})
export class SuiTableDirective {
  @Input() public suiBasic: SuiTableBasicType = null;
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiPadded: SuiTablePadding = null;
  @Input() public suiCompact: SuiTableCompactness = null;
  @Input() public suiSize: SuiTableSize = null;
  @Input() public suiStacking: SuiStacking = null;
  @Input() @InputBoolean() public suiCelled = false;
  @Input() @InputBoolean() public suiStriped = false;
  @Input() @InputBoolean() public suiDefinition = false;
  @Input() @InputBoolean() public suiStructured = false;
  @Input() @InputBoolean() public suiSingleLine = false;
  @Input() @InputBoolean() public suiFixed = false;
  @Input() @InputBoolean() public suiSelectable = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiCollapsing = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiBasic,
      this.suiPadded,
      this.suiCompact,
      this.suiSize,
      this.suiStacking,
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
      'table'
    ].joinWithWhitespaceCleanup();
  }
}
