import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, Utils} from '../../common';

export type SuiButtonEmphasis = 'primary' | 'secondary' | 'positive' | 'negative' | null;
export type SuiButtonAnimation = 'animated' | 'animated fade' | 'vertical animated' | null;
export type SuiButtonLabeling = 'labeled' | 'left labeled' | 'right labeled' | null;
export type SuiButtonFloating = 'right floated' | 'left floated' | null;
export type SuiSocialButtonStyle = 'facebook' | 'twitter' | 'google' | 'plus' | 'vk' | 'linkedin' | 'instagram' | 'youtube' | null;
export type SuiButtonAttachment = 'top attached' | 'bottom attached' | 'left attached' | 'right attached' | null;

@Component({
  selector: 'button[sui-button], a[sui-button], div[sui-button]',
  template: `
    <ng-content></ng-content>
  `,
})
export class SuiButtonComponent {
  @Input() public suiEmphasis: SuiButtonEmphasis = null;
  @Input() public suiAnimated: SuiButtonAnimation = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiLabeled: SuiButtonLabeling = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSocial: SuiSocialButtonStyle = null;
  @Input() public suiFloated: SuiButtonFloating = null;
  @Input() public suiAttached: SuiButtonAttachment = null;
  @Input() public suiIcon = false;
  @Input() public suiBasic = false;
  @Input() public suiInverted = false;
  @Input() public suiCompact = false;
  @Input() public suiToggle = false;
  @Input() public suiFluid = false;
  @Input() public suiCircular = false;
  @Input() public suiActive = false;
  @Input() public suiDisabled = false;
  @Input() public suiLoading = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiIcon, 'icon'),
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiToggle, 'toggle'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      this.suiSize,
      this.suiColour,
      this.suiSocial,
      this.suiAttached,
      this.suiFloated,
      this.suiSocial,
      this.suiLabeled,
      this.suiAnimated,
      this.suiEmphasis,
      'button',
    ].joinWithWhitespaceCleanup();
  }
}
