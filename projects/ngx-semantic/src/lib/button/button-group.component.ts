/**
 * Created by bolor on 4/20/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, Utils, SuiSize} from '../common';

export type SuiButtonsAttachment = 'top attached' | 'bottom attached' | null;
export type SuiButtonsIconType = 'icon' | 'labeled icon' | null;

@Component({
  selector: '[sui-button-group]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiButtonGroupComponent {
  @Input() suiAttached: SuiButtonsAttachment = null;
  @Input() suiIcon: SuiButtonsIconType = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiBasic = false;
  @Input() suiVertical = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      this.suiColour,
      this.suiAttached,
      this.suiIcon,
      this.suiSize,
      'buttons'
    ].join(' ');
  }
}
