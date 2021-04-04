/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiDropdownMenuDirection = 'left' | 'right' | null;

@Directive({
  selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenuDirective {
  @Input() public suiDirection: SuiDropdownMenuDirection = null;
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
    ].joinWithWhitespaceCleanup();
  }
}
