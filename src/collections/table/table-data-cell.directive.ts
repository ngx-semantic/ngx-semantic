/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment} from './enums';

@Directive({
  exportAs: 'suiTableCell',
  selector: '[suiTableCell]'
})
export class SuiTableCellDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiCollapsing = false;
  @Input() @InputBoolean() public suiSelectable = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiState,
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiCollapsing, 'collapsing'),
      ClassUtils.getPropClass(this.suiSelectable, 'selectable'),
    ].joinWithWhitespaceCleanup();
  }
}
