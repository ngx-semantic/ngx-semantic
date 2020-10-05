/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Directive({
  selector: '[suiFormFields]',
  exportAs: 'suiFormFields'
})
export class SuiFormFieldsDirective {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiInline = false;
  @Input() suiGrouped = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiWidth,
      Utils.getPropClass(this.suiInline, 'inline'),
      Utils.getPropClass(this.suiGrouped, 'grouped'),
      'fields'
    ].joinWithWhitespaceCleanup();
  }
}
