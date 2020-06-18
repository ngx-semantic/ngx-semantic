/**
 * Created by bolor on 6/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: '[sui-menu]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiMenuComponent {
  @Input() suiText = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiText, 'text'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
