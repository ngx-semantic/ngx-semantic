/**
 * Created by bolor on 4/28/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiHorizontalPosition, SuiLocation, SuiSize} from '../common';

@Component({
  selector: '[sui-input]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiInputComponent {
  @Input() suiLocation: SuiLocation = null;
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
      this.getPropClass(this.suiInverted, 'inverted'),
      this.getPropClass(this.suiFluid, 'fluid'),
      this.getPropClass(this.suiFocus, 'focus'),
      this.getPropClass(this.suiIcon, 'icon'),
      this.getPropClass(this.suiTransparent, 'transparent'),
      this.getPropClass(this.suiLoading, 'loading'),
      this.getPropClass(this.suiDisabled, 'disabled'),
      this.getPropClass(this.suiError, 'error'),
      'input'
    ].join(' ');
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

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
