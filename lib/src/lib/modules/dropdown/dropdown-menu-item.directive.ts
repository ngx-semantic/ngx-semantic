/**
 * Created by bolor on 10/30/2020
 */

import {ContentChild, Directive, HostBinding, HostListener, Input} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;

  @Input() public suiValue: any = null;
  @Input() public suiSelected = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'item',
      Utils.getPropClass(this.suiSelected, 'active selected')
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