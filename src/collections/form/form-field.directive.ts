/**
 * Created by bolor on 6/5/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiFormField',
  selector: '[suiFormField]'
})
export class SuiFormFieldDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiError = false;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiRequired = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiInline, 'inline'),
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiRequired, 'required'),
      'field',
      ClassUtils.getPropClass(this.suiError, 'error')
    ].join(' ');
  }
}
