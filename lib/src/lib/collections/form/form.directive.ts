/**
 * Created by bolor on 6/5/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

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
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiEqualWidth, 'equal width'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiSize,
      'form',
      this.suiState
    ].joinWithWhitespaceCleanup();
  }
}
