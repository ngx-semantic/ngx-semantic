/**
 * Created by bolor on 10/30/2020
 */

import {Component, ContentChild, HostBinding, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
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
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiError = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiScrolling = false;
  @Input() @InputBoolean() public suiCompact = false;
  @Input()  @InputBoolean()public suiFloating = false;
  @Input() @InputBoolean() public suiSimple = false;
  @Input() @InputBoolean() public suiLabeled = false;

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
      Utils.getPropClass(this.disabled, 'disabled'),
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
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;

    // handle regular dropdown
    if (this.contentMenu) {
      this.contentMenu.suiIsOpen = this.isOpen;
    }
  }
}
