/**
 * Created by bolor on 6/5/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiFormState = 'success' | 'warning' | 'error' | null;

@Directive({
  selector: '[sui-form]',
  exportAs: 'suiForm'
})
export class SuiFormDirective {
  @Input() public suiState: SuiFormState = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiEqualWidth = false;
  @Input() @InputBoolean() public suiInverted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.suiEqualWidth, 'equal width'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      this.suiSize,
      'form',
      this.suiState
    ].join(' ');
  }
}
