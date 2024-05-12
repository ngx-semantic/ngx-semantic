/**
 * Created by bolor on 10/10/2020
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment } from './enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiTableCell',
  selector: '[suiTableCell]'
})
export class SuiTableCellDirective extends BaseDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiCollapsing = false;
  @Input() @InputBoolean() public suiSelectable = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiState,
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiCollapsing, 'collapsing'),
      ClassUtils.getPropClass(this.suiSelectable, 'selectable'),
    ].join(' ');
  }
}
