/**
 * Created by bolor on 7/28/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../../common';

@Directive({
  selector: '[sui-feed]',
  exportAs: 'suiFeed'
})
export class SuiFeedDirective {
  @Input() public suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'feed'
    ].joinWithWhitespaceCleanup();
  }
}
