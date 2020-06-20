/**
 * Created by bolor on 6/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

export type SuiMenuAttachment = 'top attached' | 'attached' | 'bottom attached' | null;

@Component({
  selector: '[sui-menu]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiMenuComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAttached: SuiMenuAttachment = null;
  @Input() suiText = false;
  @Input() suiSecondary = false;
  @Input() suiPointing = false;
  @Input() suiTabular = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAttached,
      this.suiWidth,
      this.suiWidth ? 'item' : '',
      Utils.getPropClass(this.suiText, 'text'),
      Utils.getPropClass(this.suiSecondary, 'secondary'),
      Utils.getPropClass(this.suiPointing, 'pointing'),
      Utils.getPropClass(this.suiTabular, 'tabular'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
