import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

export type SuiSelectMenuDirection = 'left' | 'right' | null;

@Directive({
  selector: '[suiSelectMenu]'
})
export class SuiSelectMenuDirective {
  @Input() public suiDirection: SuiSelectMenuDirection = null;
  @Input() public suiScrolling = false;

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
      Utils.getPropClass(this.suiScrolling, 'scrolling'),
      this.suiDirection,
      'menu',
      'transition',
      Utils.getPropClass(!this.isOpen, 'hidden'),
      Utils.getPropClass(this.isOpen, 'visible')
    ].joinWithWhitespaceCleanup();
  }
}
