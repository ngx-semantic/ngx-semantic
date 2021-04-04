/**
 * Created by bolor on 4/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiImageAlignment = 'top aligned' | 'bottom aligned' | 'middle aligned' | null;
export type SuiImageFloat = 'left floated' | 'right floated' | null;

@Directive({
  selector: '[sui-image]',
  exportAs: 'suiImage'
})
export class SuiImageDirective {
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

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiFloated,
      this.suiAlignment,
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.disabled, 'disabled'),
      Utils.getPropClass(this.suiAvatar, 'avatar'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiRounded, 'rounded'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiSpaced, 'spaced'),
      'image'
    ].joinWithWhitespaceCleanup();
  }
}
