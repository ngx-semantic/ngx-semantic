/**
 * Created by bolor on 5/4/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiLoaderInlineAlignment = 'centered' | 'normal' | null;

@Directive({
  selector: '[sui-loader]'
})
export class SuiLoaderDirective {
  @Input() public suiInline: SuiLoaderInlineAlignment = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiText = false;
  @Input() public suiIndeterminate = false;
  @Input() public suiActive = false;
  @Input() public suiDisabled = false;
  @Input() public suiInverted = false;

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

  public getInline(): string {
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
