/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiPlaceholderImage',
  selector: '[suiPlaceholderImage]'
})
export class SuiPlaceholderImageDirective {
  @Input() @InputBoolean() public suiSquare = false;
  @Input() @InputBoolean() public suiRectangular = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiSquare, 'square'),
      ClassUtils.getPropClass(this.suiRectangular, 'rectangular'),
      'image'
    ].joinWithWhitespaceCleanup();
  }
}
