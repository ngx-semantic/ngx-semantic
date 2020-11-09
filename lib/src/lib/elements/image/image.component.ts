/**
 * Created by bolor on 4/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiImageAlignment = 'top aligned' | 'bottom aligned' | 'middle aligned' | null;
export type SuiImageFloat = 'left floated' | 'right floated' | null;

@Component({
  selector: '[sui-image]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiImageComponent {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAlignment: SuiImageAlignment = null;
  @Input() public suiFloated: SuiImageFloat = null;
  @Input() public suiHidden = false;
  @Input() public suiDisabled = false;
  @Input() public suiAvatar = false;
  @Input() public suiBordered = false;
  @Input() public suiFluid = false;
  @Input() public suiRounded = false;
  @Input() public suiCircular = false;
  @Input() public suiCentered = false;
  @Input() public suiSpaced = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiFloated,
      this.suiAlignment,
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiAvatar, 'avatar'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiRounded, 'rounded'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiSpaced, 'spaced'),
      'image'
    ].joinWithWhitespaceCleanup();
  }
}
