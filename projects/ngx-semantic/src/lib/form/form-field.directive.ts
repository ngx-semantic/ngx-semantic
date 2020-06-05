/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth} from '../common';

@Directive({
  selector: '[sui-form-field]'
})
export class SuiFormFieldDirective {
  @Input() suiWidth: SuiWidth = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      'field'
    ].joinWithWhitespaceCleanup();
  }
}
