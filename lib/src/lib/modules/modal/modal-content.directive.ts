/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[suiModalContent]',
  exportAs: 'suiModalContent'
})
export class SuiModalContentDirective {
  @Input() public suiImage: boolean;
  @Input() public suiScrollable: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiScrollable, 'scrolling'),
      Utils.getPropClass(this.suiImage, 'image'),
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
