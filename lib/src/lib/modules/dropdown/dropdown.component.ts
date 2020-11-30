/**
 * Created by bolor on 10/30/2020
 */

import {Component, ContentChild, HostBinding, HostListener, Input} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Component({
  selector: 'sui-dropdown, [sui-dropdown]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiDropdownComponent {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;

  @Input() public suiFluid = false;
  @Input() public suiInline = false;
  @Input() public suiLoading = false;
  @Input() public suiError = false;
  @Input() public suiDisabled = false;
  @Input() public suiScrolling = false;
  @Input() public suiCompact = false;

  private isOpen = false;

  @HostBinding('tabindex')
  get tabIndex(): number {
    return 0;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiInline, 'inline'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiScrolling, 'scrolling'),
      'dropdown',
      Utils.getPropClass(this.isOpen, 'active'),
      Utils.getPropClass(this.isOpen, 'visible'),
      Utils.getPropClass(this.suiError, 'error')
    ].joinWithWhitespaceCleanup();
  }

  @HostListener('click')
  public onClick(): void {
    if (this.suiDisabled) {
      return;
    }

    this.isOpen = !this.isOpen;

    // handle regular dropdown
    if (this.contentMenu) {
      this.contentMenu.suiIsOpen = this.isOpen;
    }
  }
}
