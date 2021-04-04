import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiDividerDirection = 'vertical' | 'horizontal' | null;

@Directive({
  selector: '[sui-divider]',
  exportAs: 'suiDivider'
})
export class SuiDividerDirective {
  @Input() public suiDirection: SuiDividerDirection = null;
  @Input() @InputBoolean() public suiHeader = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public suiHidden = false;
  @Input() @InputBoolean() public suiSection = false;
  @Input() @InputBoolean() public suiClearing = false;

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
    ].joinWithWhitespaceCleanup();
  }
}
