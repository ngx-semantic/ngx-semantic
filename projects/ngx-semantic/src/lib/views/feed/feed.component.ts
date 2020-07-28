/**
 * Created by bolor on 7/28/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../../common';

@Component({
  selector: '[sui-feed]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFeedComponent {
  @Input() suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'feed'
    ].joinWithWhitespaceCleanup();
  }
}
