/**
 * Created by bolor on 9/20/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiStepsAttachment = 'top attached' | 'bottom attached' | null;

@Directive({
  selector: '[sui-steps]',
  exportAs: 'suiSteps'
})
export class SuiStepsDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAttached: SuiStepsAttachment = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiOrdered = false;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiUnstackable = false;
  @Input() @InputBoolean() public suiTabletStackable = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiWidth,
      this.suiAttached,
      Utils.getPropClass(this.suiOrdered, 'ordered'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      Utils.getPropClass(this.suiUnstackable, 'unstackable'),
      Utils.getPropClass(this.suiTabletStackable, 'tablet stackable'),
      'steps'
    ].joinWithWhitespaceCleanup();
  }
}
