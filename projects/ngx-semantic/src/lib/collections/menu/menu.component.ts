/**
 * Created by bolor on 6/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiWidth, Utils} from '../../common';

export type SuiMenuAttachment = 'top attached' | 'attached' | 'bottom attached' | null;
export type SuiMenuFixation = 'top' | 'bottom' | 'left' | 'right' | null;

@Component({
  selector: '[sui-menu]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiMenuComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiAttached: SuiMenuAttachment = null;
  @Input() suiFixed: SuiMenuFixation = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiText = false;
  @Input() suiSecondary = false;
  @Input() suiPointing = false;
  @Input() suiTabular = false;
  @Input() suiVertical = false;
  @Input() suiFluid = false;
  @Input() suiRight = false;
  @Input() suiPagination = false;
  @Input() suiCompact = false;
  @Input() suiStackable = false;
  @Input() suiInverted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      this.suiAttached,
      this.suiFixed,
      this.suiFixed ? 'fixed' : '',
      this.suiWidth,
      this.suiWidth ? 'item' : '',
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiText, 'text'),
      Utils.getPropClass(this.suiSecondary, 'secondary'),
      Utils.getPropClass(this.suiPointing, 'pointing'),
      Utils.getPropClass(this.suiRight, 'right'),
      Utils.getPropClass(this.suiTabular, 'tabular'),
      Utils.getPropClass(this.suiPagination, 'pagination'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiStackable, 'stackable'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
