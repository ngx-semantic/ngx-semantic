/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[sui-form-field]'
})
export class SuiFormFieldDirective {
  @HostBinding('class')
  get classes(): string {
    return ['field'].joinWithWhitespaceCleanup();
  }
}
