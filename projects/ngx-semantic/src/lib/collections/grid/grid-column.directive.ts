/**
 * Created by bolor on 6/14/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from '../../common';

@Directive({
  selector: '[sui-grid-column]'
})
export class SuiGridColumnDirective {
  @Input() suiWidth: SuiWidth = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      'column'
    ].joinWithWhitespaceCleanup();
  }
}
