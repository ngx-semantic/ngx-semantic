/**
 * Created by bolor on 10/10/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiTableTextAlignment, SuiTableVerticalAlignment } from './enums';
import { SuiWidth } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiTableHeaderCell',
  selector: '[suiTableHeaderCell]'
})
export class SuiTableHeaderCellDirective extends BaseDirective {
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() public suiWidth: SuiWidth = null;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiWidth ? 'wide' : '',
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : ''
    ].join(' ');
  }
}
