/**
 * Created by bolor on 10/30/2020
 */

import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {Utils} from '../../common';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';
import {IDropdownOption} from './interfaces/IDropdownOption';

@Component({
  selector: 'sui-dropdown',
  template: `
    <ng-container *ngIf="suiSelection">
      <input
        type="hidden"
        [name]="name">
      <i sui-icon
         suiIconType="dropdown"></i>
      <div
        [class.default]="defaultText"
        [class.text]="true">
        {{displayText}}
      </div>
      <div suiDropdownMenu>
        <ng-container *ngFor="let option of suiOptions">
          <div suiDropdownMenuItem
               [suiValue]="option.value"
               [suiSelected]="isActive(option)"
               (click)="onItemClick(option)">
            <ng-container *ngIf="option.image">
              <img sui-image
                   suiSize="mini"
                   [suiAvatar]="option.image.avatar"
                   [src]="option.image.src">
            </ng-container>
            <ng-container *ngIf="option.flag">
              <i sui-icon
                 [suiIconType]="option.flag"></i>
            </ng-container>
            {{option.text}}
          </div>
        </ng-container>
      </div>
    </ng-container>

    <ng-container *ngIf="!suiSelection">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class SuiDropdownComponent {
  @ContentChild(SuiDropdownMenuDirective) public contentMenu: SuiDropdownMenuDirective;
  @ViewChild(SuiDropdownMenuDirective) public optionsMenu: SuiDropdownMenuDirective;

  @Input() public suiSearch = false;
  @Input() public suiFluid = false;
  @Input() public suiInline = false;
  @Input() public suiLoading = false;
  @Input() public suiError = false;
  @Input() public suiDisabled = false;
  @Input() public suiScrolling = false;
  @Input() public suiCompact = false;

  // selection specific fields
  @Input() public suiOptions: Array<IDropdownOption> = [];
  @Input() public suiPlaceholder: string = null;
  @Input() public name: string = null;
  @Input() public suiSelection = false;
  @Input() public suiMultiple = false;
  @Output() public suiSelectionChanged = new EventEmitter<any | Array<any>>();

  private selectedOption: IDropdownOption;
  private selectedOptions: Array<IDropdownOption> = [];

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

  public get displayText(): string {
    return this.selectedOption?.text || this.suiPlaceholder;
  }

  public get defaultText(): boolean {
    return !this.selectedOption;
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

    // handle selection dropdown
    if (this.optionsMenu) {
      this.optionsMenu.suiIsOpen = this.isOpen;
    }
  }

  public isActive(option: IDropdownOption): boolean {
    return this.selectedOption === option;
  }

  public onItemClick(option: IDropdownOption): void {
    const valueChanged = this.selectedOption !== option;
    this.selectedOption = option;

    if (valueChanged) {
      this.suiSelectionChanged.emit(option.value);
    }
  }
}
