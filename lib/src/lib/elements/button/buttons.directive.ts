/**
 * Created by bolor on 4/20/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, SuiWidth, Utils} from '../../common';

export type SuiButtonsAttachment = 'top attached' | 'bottom attached' | null;
export type SuiButtonsIconType = 'icon' | 'labeled icon' | null;

@Directive({
  selector: '[sui-buttons]'
})
export class SuiButtonsDirective {
  @Input() public suiAttached: SuiButtonsAttachment = null;
  @Input() public suiIcon: SuiButtonsIconType = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiBasic = false;
  @Input() public suiVertical = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      this.suiColour,
      this.suiAttached,
      this.suiIcon,
      this.suiSize,
      'buttons'
    ].joinWithWhitespaceCleanup();
  }
}
