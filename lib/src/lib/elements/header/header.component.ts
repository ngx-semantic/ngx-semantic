import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, Utils} from '../../common';

export type SuiHeaderAlignment = 'left aligned' | 'right aligned' | 'center aligned' | 'justified' | null;
export type SuiHeaderAttachment = 'attached' | 'top attached' | 'bottom attached' | null;
export type SuiHeaderFloating = 'left floated' | 'right floated' | null;

@Component({
  selector: '[sui-header]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiHeaderComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAlignment: SuiHeaderAlignment = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiAttached: SuiHeaderAttachment = null;
  @Input() suiFloated: SuiHeaderFloating = null;
  @Input() suiSubHeader = false;
  @Input() suiDisabled = false;
  @Input() suiDividing = false;
  @Input() suiBlock = false;
  @Input() suiInverted = false;
  @Input() suiIcon = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      this.suiSize,
      this.suiAttached,
      this.suiFloated,
      this.suiAlignment,
      Utils.getPropClass(this.suiDividing, 'dividing'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiBlock, 'block'),
      Utils.getPropClass(this.suiSubHeader, 'sub'),
      Utils.getPropClass(this.suiIcon, 'icon'),
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
