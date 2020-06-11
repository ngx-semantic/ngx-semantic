/**
 * Created by bolor on 4/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../../common';

@Component({
  selector: '[sui-image-group]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiImageGroupComponent {
  @Input() suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'images'
    ].joinWithWhitespaceCleanup();
  }
}
