/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiStacking, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
      ClassUtils.getPropClass(this.suiSelectable, 'selectable'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      this.suiColour,
      ClassUtils.getPropClass(this.suiCelled, 'celled'),
      ClassUtils.getPropClass(this.suiStriped, 'striped'),
      ClassUtils.getPropClass(this.suiDefinition, 'definition'),
      ClassUtils.getPropClass(this.suiStructured, 'structured'),
      ClassUtils.getPropClass(this.suiFixed, 'fixed'),
      ClassUtils.getPropClass(this.suiSingleLine, 'single line'),
      ClassUtils.getPropClass(this.suiCollapsing, 'collapsing'),
      'table'
    ].join(' ');
  }
}
