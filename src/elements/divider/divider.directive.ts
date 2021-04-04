import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiHeader, 'header'),
      ClassUtils.getPropClass(this.suiFitted, 'fitted'),
      ClassUtils.getPropClass(this.suiHidden, 'hidden'),
      ClassUtils.getPropClass(this.suiSection, 'section'),
      ClassUtils.getPropClass(this.suiClearing, 'clearing'),
      this.suiDirection,
      'divider'
    ].joinWithWhitespaceCleanup();
  }
}
