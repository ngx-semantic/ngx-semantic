/**
 * Created by bolor on 6/17/2020
 */

import { Directive, ElementRef, Input } from '@angular/core';
import {SuiColour, SuiSize, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiMenuAttachment = 'top' | 'bottom' | null;
export type SuiMenuFixation = 'top' | 'bottom' | 'left' | 'right' | null;
export type SuiMenuIconType = 'icon' | 'labeled icon' | null;

@Directive({
  selector: '[sui-menu]',
  exportAs: 'suiMenu'
})
export class SuiMenuDirective extends BaseDirective {
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

  constructor(element: ElementRef) {
    super(element);
  }

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
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      ClassUtils.getPropClass(this.suiText, 'text'),
      ClassUtils.getPropClass(this.suiSecondary, 'secondary'),
      ClassUtils.getPropClass(this.suiPointing, 'pointing'),
      ClassUtils.getPropClass(this.suiRight, 'right'),
      ClassUtils.getPropClass(this.suiTabular, 'tabular'),
      ClassUtils.getPropClass(this.suiPagination, 'pagination'),
      ClassUtils.getPropClass(this.suiStackable, 'stackable'),
      ClassUtils.getPropClass(this.suiBorderless, 'borderless'),
      'menu'
    ].join(' ');
  }
}
