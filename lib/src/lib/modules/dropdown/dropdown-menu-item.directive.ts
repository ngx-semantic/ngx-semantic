/**
 * Created by bolor on 10/30/2020
 */

import {AfterViewInit, ContentChild, Directive, HostBinding} from '@angular/core';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Directive({
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective implements AfterViewInit {
  @ContentChild(SuiDropdownMenuDirective) public menu: SuiDropdownMenuDirective;

  @HostBinding('class')
  get classes(): string {
    return [
      'item'
    ].joinWithWhitespaceCleanup();
  }

  @HostBinding('mouseenter')
  public onHover(): void {
    if (this.menu) {
      this.menu.suiIsOpen = true;
    }
  }

  @HostBinding('mouseleave')
  public onUnhover(): void {
    if (this.menu) {
      this.menu.suiIsOpen = false;
    }
  }

  ngAfterViewInit() {
    console.log(this.menu);
  }
}
