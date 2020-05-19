/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../common';

@Directive({
  selector: '[sui-placeholder-image]'
})
export class SuiPlaceholderImageDirective {
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
