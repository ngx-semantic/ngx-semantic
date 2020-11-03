/**
 * Created by bolor on 10/30/2020
 */

import {ContentChild, Directive, HostBinding, HostListener, Input} from '@angular/core';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective {
  @ContentChild(SuiDropdownMenuDirective) public menu: SuiDropdownMenuDirective;

  @Input() public suiValue: any = null;

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
    if (this.menu) {
      this.menu.suiIsOpen = !this.menu.suiIsOpen;
    }
  }
}
