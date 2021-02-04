/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

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
      Utils.getPropClass(this.suiInline, 'inline'),
      Utils.getPropClass(this.suiGrouped, 'grouped'),
      'fields',
    ].joinWithWhitespaceCleanup();
  }
}
