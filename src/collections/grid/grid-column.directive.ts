/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiWidth} from 'ngx-semantic/core/enums';

export type SuiColumnFloat = 'left floated' | 'right floated' | null;
export type SuiColumnAlignment = 'left aligned' | 'middle aligned' | 'right aligned' | null;

@Directive({
  exportAs: 'suiGridColumn',
  selector: '[suiGridColumn]'
})
export class SuiGridColumnDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiFloated: SuiColumnFloat = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAlignment: SuiColumnAlignment = null;
  @Input() public suiDeviceVisibility: string = null;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      this.suiFloated,
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      this.suiColour,
      this.suiDeviceVisibility,
      'column'
    ];
  }
}
