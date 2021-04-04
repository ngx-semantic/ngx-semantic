/**
 * Created by bolor on 6/17/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, SuiWidth, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiMenuAttachment = 'top' | 'bottom' | null;
export type SuiMenuFixation = 'top' | 'bottom' | 'left' | 'right' | null;
export type SuiMenuIconType = 'icon' | 'labeled icon' | null;

@Directive({
  selector: '[sui-menu]',
  exportAs: 'suiMenu'
})
export class SuiMenuDirective {
  @Input() public suiWidth: SuiWidth = null;
  @Input() public suiAttached: SuiMenuAttachment = null;
  @Input() public suiFixed: SuiMenuFixation = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiIcon: SuiMenuIconType = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiText = false;
  @Input() @InputBoolean() public suiSecondary = false;
  @Input() @InputBoolean() public suiPointing = false;
  @Input() @InputBoolean() public suiTabular = false;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiRight = false;
  @Input() @InputBoolean() public suiPagination = false;
  @Input() @InputBoolean() public suiCompact = false;
  @Input() @InputBoolean() public suiStackable = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiBorderless = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      this.suiSize,
      this.suiAttached,
      this.suiAttached ? 'attached' : '',
      this.suiFixed,
      this.suiFixed ? 'fixed' : '',
      this.suiWidth,
      this.suiWidth ? 'item' : '',
      this.suiIcon,
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      Utils.getPropClass(this.suiText, 'text'),
      Utils.getPropClass(this.suiSecondary, 'secondary'),
      Utils.getPropClass(this.suiPointing, 'pointing'),
      Utils.getPropClass(this.suiRight, 'right'),
      Utils.getPropClass(this.suiTabular, 'tabular'),
      Utils.getPropClass(this.suiPagination, 'pagination'),
      Utils.getPropClass(this.suiStackable, 'stackable'),
      Utils.getPropClass(this.suiBorderless, 'borderless'),
      'menu'
    ].joinWithWhitespaceCleanup();
  }
}
