/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Directive({
  exportAs: 'suiFormFields',
  selector: '[suiFormFields]',
})
export class SuiFormFieldsDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiInline = false;
  @Input() public suiGrouped = false;

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
