/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[suiModalContent]',
  exportAs: 'suiModalContent'
})
export class SuiModalContentDirective {
  @Input() @InputBoolean() public suiImage = false;
  @Input() @InputBoolean() public suiScrollable = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiScrollable, 'scrolling'),
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
