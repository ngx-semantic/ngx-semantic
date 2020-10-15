/**
 * Created by bolor on 6/5/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiFormState = 'success' | 'warning' | 'error' | null;

@Component({
  selector: '[sui-form]',
  template: `
    <ng-content></ng-content>
  `,
})
export class SuiFormComponent {
  @Input() public suiState: SuiFormState = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiLoading = false;
  @Input() public suiEqualWidth = false;
  @Input() public suiInverted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiEqualWidth, 'equal width'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiSize,
      'form',
      this.suiState,
    ].joinWithWhitespaceCleanup();
  }
}
