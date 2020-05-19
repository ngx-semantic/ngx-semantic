/**
 * Created by bolor on 5/8/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../common';

@Component({
  selector: '[sui-placeholder-image]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiPlaceholderImageComponent {
  @Input() suiSquare = false;
  @Input() suiRectangular = false;
  @Input() suiHeader = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiSquare, 'square'),
      Utils.getPropClass(this.suiRectangular, 'rectangular'),
      'image',
      Utils.getPropClass(this.suiHeader, 'header')
    ].joinWithWhitespaceCleanup();
  }
}
