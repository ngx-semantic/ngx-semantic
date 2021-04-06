/**
 * Created by bolor on 10/10/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiTableTextAlignment, SuiTableVerticalAlignment} from './enums';
import {SuiWidth} from 'ngx-semantic/core/enums';

@Directive({
  exportAs: 'suiTableHeaderCell',
  selector: '[suiTableHeaderCell]'
})
export class SuiTableHeaderCellDirective {
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() public suiWidth: SuiWidth = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth ? 'wide' : '',
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : ''
    ].join(' ');
  }
}
