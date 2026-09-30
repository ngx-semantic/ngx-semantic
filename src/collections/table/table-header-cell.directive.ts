/**
 * Created by bolor on 10/10/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiTableSortDirection, SuiTableTextAlignment, SuiTableVerticalAlignment } from './enums';
import { SuiWidth } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
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
  @Input() public suiSorted: SuiTableSortDirection = null;
  @Input() @InputBoolean() public suiSingleLine = false;
  @Input() @InputBoolean() public suiCollapsing = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      this.suiSorted ? `sorted ${this.suiSorted}` : '',
      ClassUtils.getPropClass(this.suiSingleLine, 'single line'),
      ClassUtils.getPropClass(this.suiCollapsing, 'collapsing')
    ].join(' ');
  }
}
