/**
 * Created by bolor on 4/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../common';

export type SuiImageAlignment = 'top aligned' | 'bottom aligned' | 'middle aligned' | null;
export type SuiImageFloat = 'left floated' | 'right floated' | null;

@Component({
  selector: '[sui-image]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiImageComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAlignment: SuiImageAlignment = null;
  @Input() suiFloated: SuiImageFloat = null;
  @Input() suiHidden = false;
  @Input() suiDisabled = false;
  @Input() suiAvatar = false;
  @Input() suiBordered = false;
  @Input() suiFluid = false;
  @Input() suiRounded = false;
  @Input() suiCircular = false;
  @Input() suiCentered = false;
  @Input() suiSpaced = false;

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
