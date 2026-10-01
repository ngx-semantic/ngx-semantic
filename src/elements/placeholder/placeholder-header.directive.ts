/**
 * Created by bolor on 5/8/2020
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiPlaceholderHeader',
  selector: '[suiPlaceholderHeader]'
})
export class SuiPlaceholderHeaderDirective extends BaseDirective {
  @Input() @InputBoolean() public suiImage = false;

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiImage, 'image'),
      'header'
    ].join(' ');
  }
}
