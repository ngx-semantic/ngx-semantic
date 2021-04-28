import {Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiButtonEmphasis = 'primary' | 'secondary' | 'positive' | 'negative' | null;
export type SuiButtonAnimation = 'animated' | 'animated fade' | 'vertical animated' | null;
export type SuiButtonLabeling = 'labeled' | 'left labeled' | 'right labeled' | null;
export type SuiButtonFloating = 'right floated' | 'left floated' | null;
export type SuiSocialButtonStyle = 'facebook' | 'twitter' | 'google' | 'plus' | 'vk' | 'linkedin' | 'instagram' | 'youtube' | null;
export type SuiButtonAttachment = 'top attached' | 'bottom attached' | 'left attached' | 'right attached' | null;

@Directive({
  selector: '[sui-button]',
  exportAs: 'suiButton'
})
export class SuiButtonDirective extends BaseDirective {
  @Input() public suiEmphasis: SuiButtonEmphasis = null;
  @Input() public suiAnimated: SuiButtonAnimation = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiLabeled: SuiButtonLabeling = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSocial: SuiSocialButtonStyle = null;
  @Input() public suiFloated: SuiButtonFloating = null;
  @Input() public suiAttached: SuiButtonAttachment = null;
  @Input() @InputBoolean() public suiIcon = false;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiCompact = false;
  @Input() @InputBoolean() public suiToggle = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLoading = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiIcon, 'icon'),
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      ClassUtils.getPropClass(this.suiToggle, 'toggle'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiCircular, 'circular'),
      this.suiSize,
      this.suiColour,
      this.suiSocial,
      this.suiAttached,
      this.suiFloated,
      this.suiSocial,
      this.suiLabeled,
      this.suiAnimated,
      this.suiEmphasis,
      'button'
    ].join(' ');
  }
}
