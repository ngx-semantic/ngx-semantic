/**
 * Created by bolor on 5/6/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[sui-placeholder]',
  exportAs: 'suiPlaceholder'
})
export class SuiPlaceholderDirective {
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFluid = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'placeholder'
    ].joinWithWhitespaceCleanup();
  }
}