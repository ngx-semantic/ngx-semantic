/**
 * Created by bolor on 5/4/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../common';

export type SuiLoaderInlineAlignment = 'centered' | 'normal' | null;

@Component({
  selector: 'div[sui-loader]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiLoaderComponent {
  @Input() suiInline: SuiLoaderInlineAlignment = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiText = false;
  @Input() suiIndeterminate = false;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiInverted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.getPropClass(this.suiIndeterminate, 'indeterminate'),
      this.getPropClass(this.suiText, 'text'),
      this.getPropClass(this.suiActive, 'active'),
      this.getPropClass(this.suiDisabled, 'disabled'),
      this.getInline(),
      this.getPropClass(this.suiInverted, 'inverted'),
      'loader'
    ].join(' ');
  }

  getInline(): string {
    const classKey = 'inline';

    if (!this.suiInline) {
      return '';
    }

    if (this.suiInline === 'centered') {
      return 'centered ' + classKey;
    }

    return classKey;
  }

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
