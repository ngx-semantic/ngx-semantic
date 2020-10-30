/**
 * Created by bolor on 10/30/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenuDirective {
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
      'menu',
      'transition',
      Utils.getPropClass(!this.isOpen, 'hidden'),
      Utils.getPropClass(this.isOpen, 'visible')
    ].joinWithWhitespaceCleanup();
  }
}
