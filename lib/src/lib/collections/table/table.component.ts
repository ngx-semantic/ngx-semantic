/**
 * Created by bolor on 10/10/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: '[sui-table]',
  template: `
    <ng-content></ng-content>
  `,
})
export class SuiTableComponent {
  @Input() public suiCelled = false;
  @Input() public suiPadded = false;
  @Input() public suiStriped = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiCelled, 'celled'),
      Utils.getPropClass(this.suiPadded, 'padded'),
      Utils.getPropClass(this.suiStriped, 'striped'),
      'table'
    ].joinWithWhitespaceCleanup();
  }
}
