/**
 * Created by bolor on 5/18/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, Utils} from '../common';

export type SuiSegmentStacking = 'stacked' | 'tall stacked' | null;
export type SuiSegmentPadding = 'padded' | 'very padded' | null;
export type SuiSegmentAttachment = 'top attached' | 'attached' | 'bottom attached' | null;
export type SuiSegmentEmphasis = 'secondary' | 'tertiary' | null;
export type SuiSegmentTextAlignment = 'left aligned' | 'center aligned' | 'right aligned' | null;
export type SuiSegmentFloat = 'left floated' | 'right floated' | null;

@Component({
  selector: '[sui-segment]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSegmentComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiAttached: SuiSegmentAttachment = null;
  @Input() suiStacked: SuiSegmentStacking = null;
  @Input() suiPadding: SuiSegmentPadding = null;
  @Input() suiEmphasis: SuiSegmentEmphasis = null;
  @Input() suiTextAlignment: SuiSegmentTextAlignment = null;
  @Input() suiFloated: SuiSegmentFloat = null;
  @Input() suiPlaceholder = false;
  @Input() suiRaised = false;
  @Input() suiPiled = false;
  @Input() suiVertical = false;
  @Input() suiInverted = false;
  @Input() suiDisabled = false;
  @Input() suiLoading = false;
  @Input() suiCompact = false;
  @Input() suiCircular = false;
  @Input() suiBasic = false;
  @Input() suiClearing = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiPadding,
      this.suiStacked,
      this.suiAttached,
      this.suiEmphasis,
      this.suiTextAlignment,
      this.suiFloated,
      Utils.getPropClass(this.suiPlaceholder, 'placeholder'),
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiPiled, 'piled'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiClearing, 'clearing'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      'segment'
    ].join(' ');
  }
}
