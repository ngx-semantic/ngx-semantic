/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[suiModalContent]',
  exportAs: 'suiModalContent'
})
export class SuiModalContentDirective {
  @Input() @InputBoolean() public suiImage = false;
  @Input() @InputBoolean() public suiScrollable = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.suiScrollable, 'scrolling'),
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'content'
    ];
  }
}
