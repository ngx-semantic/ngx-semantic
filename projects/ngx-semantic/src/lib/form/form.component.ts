/**
 * Created by bolor on 6/5/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../common';

export type SuiFormState = 'success' | 'warning' | 'error' | null;

@Component({
  selector: '[sui-form]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFormComponent {
  @Input() suiState: SuiFormState = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiLoading = false;
  @Input() suiEqualWidth = false;
  @Input() suiInverted = false;

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
