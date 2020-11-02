/**
 * Created by bolor on 10/30/2020
 */

import {Component, ContentChildren, HostBinding, HostListener, Input, QueryList} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Component({
  selector: 'sui-dropdown',
  template: `
    <ng-container *ngIf="suiSelection">
      <select
        [name]="suiName"
        [multiple]="multiple"></select>
    </ng-container>

    <ng-content></ng-content>
  `
})
export class SuiDropdownComponent {
  @ContentChildren(SuiDropdownMenuDirective) public menus: QueryList<SuiDropdownMenuDirective>;

  @Input() public suiName: string = null;
  @Input() public suiSelection = false;
  @Input() public suiSearch = false;
  @Input() public suiFluid = false;
  @Input() public suiMultiple = false;
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
      Utils.getPropClass(this.suiSearch, 'search'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiSelection, 'selection'),
      Utils.getPropClass(this.suiInline, 'inline'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiScrolling, 'scrolling'),
      'dropdown',
      Utils.getPropClass(this.isOpen, 'active'),
      Utils.getPropClass(this.isOpen, 'visible'),
      Utils.getPropClass(this.suiError, 'error')
    ].joinWithWhitespaceCleanup();
  }

  public get multiple(): string | undefined {
    return this.suiMultiple ? '' : undefined;
  }

  @HostListener('click')
  public onClick(): void {
    if (this.suiDisabled) {
      return;
    }

    this.isOpen = !this.isOpen;

    if (this.menus) {
      for (const menu of this.menus) {
        menu.suiIsOpen = this.isOpen;
      }
    }
  }
}
