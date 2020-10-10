/**
 * Created by bolor on 10/10/2020
 */

import {Directive, Host, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

export type SuiTableState = 'positive' | 'negative' | 'warning' | 'error' | null;

@Directive({
  exportAs: 'suiTableRow',
  selector: '[suiTableRow]'
})
export class SuiTableRowDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiActive = false;
  @Input() public suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiState,
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled')
    ].joinWithWhitespaceCleanup();
  }
}
