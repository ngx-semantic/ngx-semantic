/**
 * Created by bolor on 5/8/2020
 */

import { Directive, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiPlaceholderImage',
  selector: '[suiPlaceholderImage]'
})
export class SuiPlaceholderImageDirective extends BaseDirective {
  @Input() @InputBoolean() public suiSquare = false;
  @Input() @InputBoolean() public suiRectangular = false;

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiSquare, 'square'),
      ClassUtils.getPropClass(this.suiRectangular, 'rectangular'),
      'image'
    ].join(' ');
  }
}
