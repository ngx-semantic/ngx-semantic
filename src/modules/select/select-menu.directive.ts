import { Directive, HostBinding, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';

export type SuiSelectMenuDirection = 'left' | 'right' | null;

@Directive({
  selector: '[suiSelectMenu]'
})
export class SuiSelectMenuDirective {
  @Input() public suiDirection: SuiSelectMenuDirection = null;
  @Input() @InputBoolean() public suiScrolling = false;

  private isOpen;

  @Input()
  set suiIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  get suiIsOpen(): boolean {
    return this.isOpen;
  }

  @HostBinding('tabindex')
  get tabIndex(): number {
    return -1;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiScrolling, 'scrolling'),
      this.suiDirection,
      'menu',
      'transition',
      ClassUtils.getPropClass(!this.isOpen, 'hidden'),
      ClassUtils.getPropClass(this.isOpen, 'visible')
    ].join(' ');
  }
}
