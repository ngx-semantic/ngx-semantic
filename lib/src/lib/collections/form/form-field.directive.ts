/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Directive({
  exportAs: 'suiFormField',
  selector: '[suiFormField]'
})
export class SuiFormFieldDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiError = false;
  @Input() suiInline = false;
  @Input() suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiInline, 'inline'),
      this.suiWidth,
      this.suiWidth ? 'wide' : '',
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'field',
      Utils.getPropClass(this.suiError, 'error'),
    ].joinWithWhitespaceCleanup();
  }
}
