/**
 * Created by bolor on 10/30/2020
 */

import {Component, ContentChild, HostBinding, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

export type SuiDropdownPointingDirection = 'top left' | 'top right' | 'left' | 'right' | 'bottom left' | 'bottom right' | null;

@Component({
  selector: 'sui-dropdown, [sui-dropdown]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class SuiDropdownComponent {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;

  @Input() public suiPointing: SuiDropdownPointingDirection = null;
  @Input() public suiFluid = false;
  @Input() public suiInline = false;
  @Input() public suiLoading = false;
  @Input() public suiError = false;
  @Input() public suiDisabled = false;
  @Input() public suiScrolling = false;
  @Input() public suiCompact = false;
  @Input() public suiFloating = false;
  @Input() public suiSimple = false;
  @Input() public suiLabeled = false;

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
      this.suiPointing ? `${this.suiPointing} pointing` : '',
      Utils.getPropClass(this.suiFloating, 'floating'),
      Utils.getPropClass(this.suiSimple, 'simple'),
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
