/**
 * Created by bolor on 6/14/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiColour, SuiWidth} from 'ngx-semantic/core/enums';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiColumnFloat = 'left floated' | 'right floated' | null;
export type SuiColumnAlignment = 'left aligned' | 'middle aligned' | 'right aligned' | null;

@Directive({
  standalone: true,
  exportAs: 'suiGridColumn',
  selector: '[suiGridColumn]'
})
export class SuiGridColumnDirective extends BaseDirective{
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiFloated: SuiColumnFloat = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAlignment: SuiColumnAlignment = null;
  @Input() public suiDeviceVisibility: string | null = null;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiFloated,
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      this.suiColour,
      this.suiDeviceVisibility,
      'column'
    ].join(' ');
  }
}
