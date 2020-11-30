/**
 * Created by bolor on 10/30/2020
 */

import {ContentChild, Directive, HostBinding, HostListener} from '@angular/core';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;

  @HostBinding('class')
  get classes(): string {
    return [
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
