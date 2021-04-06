/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiFormFields',
  selector: '[suiFormFields]'
})
export class SuiFormFieldsDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public suiGrouped = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      ClassUtils.getPropClass(this.suiInline, 'inline'),
      ClassUtils.getPropClass(this.suiGrouped, 'grouped'),
      'fields'
    ].join(' ');
  }
}
