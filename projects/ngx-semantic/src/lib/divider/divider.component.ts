import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../common';

export type SuiDividerDirection = 'vertical' | 'horizontal' | null;

@Component({
  selector: '[sui-divider]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiDividerComponent {
  @Input() suiDirection: SuiDividerDirection = null;
  @Input() suiHeader = false;
  @Input() suiInverted = false;
  @Input() suiFitted = false;
  @Input() suiHidden = false;
  @Input() suiSection = false;
  @Input() suiClearing = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiInverted, 'inverted'),
      Utils.getPropClass(this.suiHeader, 'header'),
      Utils.getPropClass(this.suiFitted, 'fitted'),
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.suiSection, 'section'),
      Utils.getPropClass(this.suiClearing, 'clearing'),
      this.suiDirection,
      'divider'
    ].join(' ');
  }
}
