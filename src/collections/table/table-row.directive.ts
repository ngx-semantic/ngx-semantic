/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment} from 'ngx-semantic/collections/table/enums';

@Directive({
  exportAs: 'suiTableRow',
  selector: '[suiTableRow]'
})
export class SuiTableRowDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiState,
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled')
    ].joinWithWhitespaceCleanup();
  }
}
