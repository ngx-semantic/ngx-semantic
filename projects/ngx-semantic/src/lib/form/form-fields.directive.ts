/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../common';

@Directive({
  selector: '[sui-form-fields]'
})
export class SuiFormFieldsDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiInline = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      Utils.getPropClass(this.suiInline, 'inline'),
      'fields'
    ].joinWithWhitespaceCleanup();
  }
}
