/**
 * Created by bolor on 4/28/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../common';

export type SuiInputLabeling = 'labeled' | 'right labeled' | 'left corner labeled' | 'corner labeled' | null;
export type SuiInputActions = 'action' | 'left action' | 'right action' | null;

@Component({
  selector: '[sui-input]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiInputComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAction: SuiInputActions = null;
  @Input() suiLabeled: SuiInputLabeling = null;
  @Input() suiFocus = false;
  @Input() suiIcon = false;
  @Input() suiTransparent = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;

  // states
  @Input() suiLoading = false;
  @Input() suiDisabled = false;
  @Input() suiError = false;

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
      Utils.getPropClass(this.suiIcon, 'icon'),
      Utils.getPropClass(this.suiTransparent, 'transparent'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiError, 'error'),
      'input'
    ].join(' ');
  }
}
