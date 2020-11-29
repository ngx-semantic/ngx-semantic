/**
 * Created by bolor on 4/28/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiInputLabeling = 'labeled' | 'right labeled' | 'left corner labeled' | 'corner labeled' | null;
export type SuiInputActions = 'action' | 'left action' | 'right action' | null;
export type SuiInputIconPosition = 'left' | 'right' | null;

@Component({
  selector: '[sui-input]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiInputComponent {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAction: SuiInputActions = null;
  @Input() public suiLabeled: SuiInputLabeling = null;
  @Input() public suiIconPosition: SuiInputIconPosition = null;
  @Input() public suiFocus = false;
  @Input() public suiIcon = false;
  @Input() public suiTransparent = false;
  @Input() public suiInverted = false;
  @Input() public suiFluid = false;

  // states
  @Input() public suiLoading = false;
  @Input() public suiDisabled = false;
  @Input() public suiError = false;

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
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiError, 'error'),
      'input'
    ].joinWithWhitespaceCleanup();
  }
}
