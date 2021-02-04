/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  exportAs: 'suiPlaceholderImage',
  selector: '[suiPlaceholderImage]'
})
export class SuiPlaceholderImageDirective {
  @Input() @InputBoolean() public suiSquare = false;
  @Input() @InputBoolean() public suiRectangular = false;
  @Input() @InputBoolean() public suiHeader = false;

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
