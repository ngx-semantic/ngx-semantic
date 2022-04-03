/**
 * Created by bolor on 4/20/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiColour, SuiSize, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiButtonsAttachment = 'top' | 'bottom' | null;
export type SuiButtonsIconType = 'icon' | 'labeled icon' | null;

@Directive({
  selector: '[sui-buttons]',
  exportAs: 'suiButtons'
})
export class SuiButtonsDirective extends BaseDirective {
  @Input() public suiAttachedPosition: SuiButtonsAttachment = null;
  @Input() public suiIcon: SuiButtonsIconType = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiAttached = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      this.suiColour,
      this.suiAttachedPosition ? this.suiAttachedPosition : '',
      ClassUtils.getPropClass(this.suiAttached, 'attached'),
      this.suiIcon,
      this.suiSize,
      'buttons'
    ].join(' ');
  }
}
