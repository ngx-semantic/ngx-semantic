/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  exportAs: 'suiPlaceholderHeader',
  selector: '[suiPlaceholderHeader]'
})
export class SuiPlaceholderHeaderDirective {
  @Input() @InputBoolean() public suiImage = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
