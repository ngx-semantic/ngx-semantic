/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiWidth} from '../../common';

export type SuiColumnFloat = 'left floated' | 'right floated' | null;
export type SuiColumnAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;

@Directive({
  selector: '[suiGridColumn]',
  exportAs: 'suiGridColumn'
})
export class SuiGridColumnDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiFloated: SuiColumnFloat = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiAlignment: SuiColumnAlignment = null;
  @Input() suiDeviceVisibility: string = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiFloated,
      this.suiAlignment,
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      this.suiColour,
      this.suiDeviceVisibility,
      'column'
    ].joinWithWhitespaceCleanup();
  }
}
