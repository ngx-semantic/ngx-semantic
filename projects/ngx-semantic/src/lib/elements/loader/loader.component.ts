/**
 * Created by bolor on 5/4/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

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
      Utils.getPropClass(this.suiIndeterminate, 'indeterminate'),
      Utils.getPropClass(this.suiText, 'text'),
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      this.getInline(),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'loader'
    ].joinWithWhitespaceCleanup();
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
}
