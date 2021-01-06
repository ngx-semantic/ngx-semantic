/**
 * Created by bolor on 9/20/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, SuiWidth, Utils} from '../../common';

export type SuiStepsAttachment = 'top attached' | 'bottom attached' | null;

@Component({
  selector: '[sui-steps]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepsComponent {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAttached: SuiStepsAttachment = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiOrdered = false;
  @Input() public suiVertical = false;
  @Input() public suiFluid = false;
  @Input() public suiUnstackable = false;
  @Input() public suiTabletStackable = false;

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
