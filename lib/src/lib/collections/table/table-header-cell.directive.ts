/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiTableTextAlignment, SuiTableVerticalAlignment, Utils} from '../../common';

@Directive({
  exportAs: 'suiTableHeaderCell',
  selector: '[suiTableHeaderCell]',
})
export class SuiTableHeaderCellDirective {
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
    ].joinWithWhitespaceCleanup();
  }
}
