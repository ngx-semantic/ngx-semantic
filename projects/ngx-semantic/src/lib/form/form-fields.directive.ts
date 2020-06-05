/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from '../common';

@Directive({
  selector: '[sui-form-fields]'
})
export class SuiFormFieldsDirective {
  @Input() suiWidth: SuiWidth = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      'fields'
    ].joinWithWhitespaceCleanup();
  }
}
