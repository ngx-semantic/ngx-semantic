/**
 * Created by bolor on 6/5/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiFormFields',
  selector: '[suiFormFields]'
})
export class SuiFormFieldsDirective extends BaseDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public suiGrouped = false;
  @Input() @InputBoolean() public suiEqualWidth = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.suiWidth,
      ClassUtils.getPropClass(this.suiInline, 'inline'),
      ClassUtils.getPropClass(this.suiGrouped, 'grouped'),
      ClassUtils.getPropClass(this.suiEqualWidth, 'equal width'),
      'fields'
    ].join(' ');
  }
}
