/**
 * Created by bolor on 10/10/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiTableState, SuiTableTextAlignment, SuiTableVerticalAlignment } from './enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiTableRow',
  selector: '[suiTableRow]'
})
export class SuiTableRowDirective extends BaseDirective {
  @Input() public suiState: SuiTableState = null;
  @Input() public suiTextAlignment: SuiTableTextAlignment = null;
  @Input() public suiVerticalAlignment: SuiTableVerticalAlignment = null;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiState,
      this.suiTextAlignment ? `${this.suiTextAlignment} aligned` : '',
      this.suiVerticalAlignment ? `${this.suiVerticalAlignment} aligned` : '',
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled')
    ].join(' ');
  }
}
