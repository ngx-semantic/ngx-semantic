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
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAttached: SuiStepsAttachment = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiOrdered = false;
  @Input() suiVertical = false;
  @Input() suiFluid = false;
  @Input() suiUnstackable = false;

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
      'steps'
    ].joinWithWhitespaceCleanup();
  }
}
