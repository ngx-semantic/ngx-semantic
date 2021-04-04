/**
 * Created by bolor on 5/4/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiLoaderInlineAlignment = 'centered' | 'normal' | null;

@Directive({
  selector: '[sui-loader]',
  exportAs: 'suiLoader'
})
export class SuiLoaderDirective {
  @Input() public suiInline: SuiLoaderInlineAlignment = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiText = false;
  @Input() @InputBoolean() public suiIndeterminate = false;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiInverted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      ClassUtils.getPropClass(this.suiIndeterminate, 'indeterminate'),
      ClassUtils.getPropClass(this.suiText, 'text'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      this.getInline(),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
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
