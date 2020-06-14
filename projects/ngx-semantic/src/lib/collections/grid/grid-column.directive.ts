/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from '../../common';

export type SuiColumnFloat = 'left floated' | 'right floated' | null;

@Directive({
  selector: '[sui-grid-column]'
})
export class SuiGridColumnDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiFloated: SuiColumnFloat = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiFloated,
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      'column'
    ].joinWithWhitespaceCleanup();
  }
}
