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
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAlignment: SuiHeaderAlignment = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAttached: SuiHeaderAttachment = null;
  @Input() public suiFloated: SuiHeaderFloating = null;
  @Input() public suiSubHeader = false;
  @Input() public suiDisabled = false;
  @Input() public suiDividing = false;
  @Input() public suiBlock = false;
  @Input() public suiInverted = false;
  @Input() public suiIcon = false;

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
