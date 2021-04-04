/**
 * Created by bolor on 9/20/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
      ClassUtils.getPropClass(this.suiOrdered, 'ordered'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      ClassUtils.getPropClass(this.suiUnstackable, 'unstackable'),
      ClassUtils.getPropClass(this.suiTabletStackable, 'tablet stackable'),
      'steps'
    ].joinWithWhitespaceCleanup();
  }
}
