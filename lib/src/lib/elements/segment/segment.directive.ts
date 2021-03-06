/**
 * Created by bolor on 5/18/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiSegmentStacking = 'stacked' | 'tall stacked' | null;
export type SuiSegmentPadding = 'padded' | 'very padded' | null;
export type SuiSegmentAttachment = 'top attached' | 'attached' | 'bottom attached' | null;
export type SuiSegmentEmphasis = 'secondary' | 'tertiary' | null;
export type SuiSegmentTextAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;
export type SuiSegmentFloat = 'left floated' | 'right floated' | null;

@Directive({
  selector: '[sui-segment]',
  exportAs: 'suiSegment'
})
export class SuiSegmentDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAttached: SuiSegmentAttachment = null;
  @Input() public suiStacked: SuiSegmentStacking = null;
  @Input() public suiPadding: SuiSegmentPadding = null;
  @Input() public suiEmphasis: SuiSegmentEmphasis = null;
  @Input() public suiTextAlignment: SuiSegmentTextAlignment = null;
  @Input() public suiFloated: SuiSegmentFloat = null;
  @Input() @InputBoolean() public suiPlaceholder = false;
  @Input() @InputBoolean() public suiRaised = false;
  @Input() @InputBoolean() public suiPiled = false;
  @Input() @InputBoolean() public suiVertical = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiCompact = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiClearing = false;
  @Input() @InputBoolean() public suiSecondary = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiPadding,
      this.suiStacked,
      this.suiAttached,
      this.suiColour,
      this.suiEmphasis,
      this.suiTextAlignment,
      this.suiFloated,
      Utils.getPropClass(this.suiPlaceholder, 'placeholder'),
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiPiled, 'piled'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.disabled, 'disabled'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiClearing, 'clearing'),
      Utils.getPropClass(this.suiSecondary, 'secondary'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      'segment'
    ].joinWithWhitespaceCleanup();
  }
}
