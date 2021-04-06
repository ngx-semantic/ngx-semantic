/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiPlaceholderHeader',
  selector: '[suiPlaceholderHeader]'
})
export class SuiPlaceholderHeaderDirective {
  @Input() @InputBoolean() public suiImage = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'header'
    ];
  }
}
