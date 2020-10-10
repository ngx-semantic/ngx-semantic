/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiTableState, Utils} from '../../common';

export type SuiTableDataCellAlignment = 'left' | 'right' | null;

@Directive({
  exportAs: 'suiTableCell',
  selector: '[suiTableCell]',
})
export class SuiTableCellDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiAlignment: SuiTableDataCellAlignment = null;
  @Input() public suiActive = false;
  @Input() public suiDisabled = false;
  @Input() public suiCollapsing = false;
  @Input() public suiSelectable = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiState,
      this.suiAlignment === 'right' ? 'right aligned' : '',
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiCollapsing, 'collapsing'),
      Utils.getPropClass(this.suiSelectable, 'selectable'),
    ].joinWithWhitespaceCleanup();
  }
}
