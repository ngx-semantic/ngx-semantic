/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  exportAs: 'suiTableCell',
  selector: '[suiTableCell]',
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
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.disabled, 'disabled'),
      Utils.getPropClass(this.suiCollapsing, 'collapsing'),
      Utils.getPropClass(this.suiSelectable, 'selectable'),
    ].joinWithWhitespaceCleanup();
  }
}
