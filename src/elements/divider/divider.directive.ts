import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiDividerDirection = 'vertical' | 'horizontal' | null;

@Directive({
  standalone: true,
  selector: '[sui-divider]',
  exportAs: 'suiDivider'
})
export class SuiDividerDirective extends BaseDirective {
  @Input() public suiDirection: SuiDividerDirection = null;
  @Input() @InputBoolean() public suiHeader = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public suiHidden = false;
  @Input() @InputBoolean() public suiSection = false;
  @Input() @InputBoolean() public suiClearing = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiFitted, 'fitted'),
      ClassUtils.getPropClass(this.suiHidden, 'hidden'),
      ClassUtils.getPropClass(this.suiSection, 'section'),
      ClassUtils.getPropClass(this.suiClearing, 'clearing'),
      this.suiDirection,
      ClassUtils.getPropClass(this.suiHeader, 'header'),
      'divider'
    ].join(' ');
  }
}
