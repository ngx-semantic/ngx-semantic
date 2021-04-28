/**
 * Created by bolor on 4/20/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiColour, SuiSize, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiButtonsAttachment = 'top attached' | 'bottom attached' | null;
export type SuiButtonsIconType = 'icon' | 'labeled icon' | null;

@Directive({
  selector: '[sui-buttons]',
  exportAs: 'suiButtons'
})
export class SuiButtonsDirective extends BaseDirective {
  @Input() public suiAttached: SuiButtonsAttachment = null;
  @Input() public suiIcon: SuiButtonsIconType = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiWidth: SuiWidth = null;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiVertical = false;

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
      this.suiAttached,
      this.suiIcon,
      this.suiSize,
      'buttons'
    ].join(' ');
  }
}
