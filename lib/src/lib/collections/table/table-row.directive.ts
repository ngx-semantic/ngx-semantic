/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment, Utils} from '../../common';

@Directive({
  exportAs: 'suiTableRow',
  selector: '[suiTableRow]',
})
export class SuiTableRowDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() public suiActive = false;
  @Input() public suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiState,
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
    ].joinWithWhitespaceCleanup();
  }
}
