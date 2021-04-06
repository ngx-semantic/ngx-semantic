/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiFormField',
  selector: '[suiFormField]'
})
export class SuiFormFieldDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiError = false;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public disabled = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.suiInline, 'inline'),
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      'field',
      ClassUtils.getPropClass(this.suiError, 'error'),
    ];
  }
}
