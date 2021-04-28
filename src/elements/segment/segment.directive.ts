/**
 * Created by bolor on 5/18/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';

import {SuiColour} from 'ngx-semantic/core/enums';
import {BaseDirective} from 'ngx-semantic/core/base';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
export class SuiSegmentDirective extends BaseDirective {
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

  constructor(element: ElementRef) {
    super(element);
  }

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
      ClassUtils.getPropClass(this.suiPlaceholder, 'placeholder'),
      ClassUtils.getPropClass(this.suiRaised, 'raised'),
      ClassUtils.getPropClass(this.suiPiled, 'piled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      ClassUtils.getPropClass(this.suiCircular, 'circular'),
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      ClassUtils.getPropClass(this.suiClearing, 'clearing'),
      ClassUtils.getPropClass(this.suiSecondary, 'secondary'),
      ClassUtils.getPropClass(this.suiVertical, 'vertical'),
      'segment'
    ].join(' ');
  }
}
