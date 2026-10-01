/**
 * Created by bolor on 10/30/2020
 */

import { ContentChild, Directive, HostListener, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiDropdownMenuDirective } from './dropdown-menu.directive';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiMenuDirection = 'left' | 'right' | null;

@Directive({
  standalone: true,
  selector: '[suiDropdownMenuItem]'
})
export class SuiDropdownMenuItemDirective extends BaseDirective {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective | undefined = undefined;

  @Input() public suiDirection: SuiMenuDirection = null;
  @Input() @InputBoolean() public disabled = false;

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      this.suiDirection,
      'item'
    ].join(' ');
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
