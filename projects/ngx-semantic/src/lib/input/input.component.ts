/**
 * Created by bolor on 4/28/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiHorizontalPosition, SuiSize, Utils} from '../common';

@Component({
  selector: '[sui-input]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiInputComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAction: SuiHorizontalPosition = null;
  @Input() suiLabeled: SuiHorizontalPosition = null;
  @Input() suiFocus = false;
  @Input() suiIcon = false;
  @Input() suiCorner = false;
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
      this.getAction(),
      this.getLabeled(),
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
    ].joinWithWhitespaceCleanup();
  }

  getAction(): string {
    const classKey = 'action';

    if (!this.suiAction) {
      return '';
    }

    if (this.suiAction === 'left') {
      return 'left ' + classKey;
    }

    return classKey;
  }

  getLabeled(): string {
    let classKey = 'labeled';

    if (this.suiCorner) {
      classKey = 'corner ' + classKey;

      if (this.suiLabeled === 'left') {
        return 'left ' + classKey;
      }

      return classKey;
    } else {
      if (this.suiAction === 'right') {
        return 'right ' + classKey;
      }

      return classKey;
    }
  }
}
