/**
 * Created by bolor on 4/26/2020
 */

import {Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiImageAlignment = 'top aligned' | 'bottom aligned' | 'middle aligned' | null;
export type SuiImageFloat = 'left floated' | 'right floated' | null;

@Directive({
  selector: '[sui-image]',
  exportAs: 'suiImage'
})
export class SuiImageDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAlignment: SuiImageAlignment = null;
  @Input() public suiFloated: SuiImageFloat = null;
  @Input() @InputBoolean() public suiHidden = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiAvatar = false;
  @Input() @InputBoolean() public suiBordered = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiRounded = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiSpaced = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiFloated,
      this.suiAlignment,
      ClassUtils.getPropClass(this.suiHidden, 'hidden'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiAvatar, 'avatar'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiRounded, 'rounded'),
      ClassUtils.getPropClass(this.suiCircular, 'circular'),
      ClassUtils.getPropClass(this.suiSpaced, 'spaced'),
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      'image'
    ].join(' ');
  }
}
