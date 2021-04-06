/**
 * Created by bolor on 4/28/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
  get classes(): Array<string> {
    return [
      'ui',
      this.suiAction,
      this.suiLabeled,
      this.suiSize,
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiFocus, 'focus'),
      this.suiIconPosition === 'left' ? 'left' : '',
      ClassUtils.getPropClass(this.suiIcon, 'icon'),
      ClassUtils.getPropClass(this.suiTransparent, 'transparent'),
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiError, 'error'),
      'input'
    ];
  }
}
