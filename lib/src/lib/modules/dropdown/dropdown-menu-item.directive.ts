/**
 * Created by bolor on 10/30/2020
 */

import {ContentChild, Directive, HostBinding, HostListener, Input} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

export type SuiMenuDirection = 'left' | 'right' | null;

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;

  @Input() public suiDirection: SuiMenuDirection = null;
  @Input() public suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      this.suiDirection,
      'item'
    ].joinWithWhitespaceCleanup();
  }

  @HostListener('mouseenter')
  public onHover(): void {
    this.toggleMenuVisibility();
  }

  @HostListener('mouseleave')
  public onUnhover(): void {
    this.toggleMenuVisibility();
  }

  private toggleMenuVisibility(): void {
    if (this.contentMenu) {
      this.contentMenu.suiIsOpen = !this.contentMenu.suiIsOpen;
    }
  }
}
