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
  @Input() public suiDefinition = false;
  @Input() public suiCompact = false;
  @Input() public suiStructured = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiCelled, 'celled'),
      Utils.getPropClass(this.suiPadded, 'padded'),
      Utils.getPropClass(this.suiStriped, 'striped'),
      Utils.getPropClass(this.suiDefinition, 'definition'),
      Utils.getPropClass(this.suiStructured, 'structured'),
      'table'
    ].joinWithWhitespaceCleanup();
  }
}
