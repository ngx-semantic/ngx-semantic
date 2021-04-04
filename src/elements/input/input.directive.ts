/**
 * Created by bolor on 4/28/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiInputLabeling = 'labeled' | 'right labeled' | 'left corner labeled' | 'corner labeled' | null;
export type SuiInputActions = 'action' | 'left action' | 'right action' | null;
export type SuiInputIconPosition = 'left' | 'right' | null;

@Directive({
  selector: '[sui-input]',
  exportAs: 'suiInput'
})
export class SuiInputDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAction: SuiInputActions = null;
  @Input() public suiLabeled: SuiInputLabeling = null;
  @Input() public suiIconPosition: SuiInputIconPosition = null;
  @Input() @InputBoolean() public suiFocus = false;
  @Input() @InputBoolean() public suiIcon = false;
  @Input() @InputBoolean() public suiTransparent = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFluid = false;

  // states
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiError = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAction,
      this.suiLabeled,
      this.suiSize,
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiFocus, 'focus'),
      this.suiIconPosition === 'left' ? 'left' : '',
      Utils.getPropClass(this.suiIcon, 'icon'),
      Utils.getPropClass(this.suiTransparent, 'transparent'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.disabled, 'disabled'),
      Utils.getPropClass(this.suiError, 'error'),
      'input'
    ].joinWithWhitespaceCleanup();
  }
}
