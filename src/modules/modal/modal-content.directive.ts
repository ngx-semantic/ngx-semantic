/**
 * Created by bolorundurowb on 1/22/2021
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[suiModalContent]',
  exportAs: 'suiModalContent'
})
export class SuiModalContentDirective extends BaseDirective {
  @Input() @InputBoolean() public suiImage = false;
  @Input() @InputBoolean() public suiScrollable = false;

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiScrollable, 'scrolling'),
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'content'
    ].join(' ');
  }
}
