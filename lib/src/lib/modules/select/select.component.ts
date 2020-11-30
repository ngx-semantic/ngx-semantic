import {Component, ContentChild, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild} from '@angular/core';
import {IDropdownOption, SuiDropdownMenuDirective} from '../dropdown';
import {Utils} from '../../common';

@Component({
  selector: 'sui-select',
  template: `
    <input
      type="hidden"
      [name]="name">
    <i sui-icon
       suiIconType="dropdown"></i>

    <!--      Search Section-->
    <ng-container *ngIf="suiSearch">
      <input class="search"
             autocomplete="off"
             tabindex="0"
             (focus)="onClick()"
             (keyup)="onSearch($event.target.value)">
    </ng-container>

    <!--      Display Section -->
    <div
      [class.default]="isDefaultText"
      [class.text]="true">
      <ng-container *ngIf="selectedOption">
        <ng-container *ngIf="selectedOption.image">
          <img sui-image
               suiSize="mini"
               [suiAvatar]="selectedOption.image.avatar"
               [src]="selectedOption.image.src"/>
        </ng-container>
        <ng-container *ngIf="selectedOption.flag">
          <i sui-icon
             [suiIconType]="selectedOption.flag"></i>
        </ng-container>
      </ng-container>
      {{displayText}}
    </div>

    <!--      Drop Down Menu Section -->
    <div suiSelectMenu>
      <ng-container *ngFor="let option of filteredOptions">
        <div suiDropdownMenuItem
             [suiValue]="option.value"
             [suiSelected]="isActive(option)"
             (click)="onItemClick(option)">
          <ng-container *ngIf="option.image">
            <img sui-image
                 suiSize="mini"
                 [suiAvatar]="option.image.avatar"
                 [src]="option.image.src"/>
          </ng-container>
          <ng-container *ngIf="option.flag">
            <i sui-icon
               [suiIconType]="option.flag"></i>
          </ng-container>
          {{option.text}}
        </div>
      </ng-container>
      <ng-container *ngIf="hasNoSearchResults()">
        <div class="message"
             (click)="$event.preventDefault()">
          No results found.
        </div>
      </ng-container>
    </div>
  `
})
export class SuiSelectComponent {
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
  @Input() public suiPlaceholder: string = null;
  @Input() public name: string = null;
  @Input() public suiSelection = false;
  @Input() public suiMultiple = false;
  @Output() public suiSelectionChanged = new EventEmitter<any | Array<any>>();

  private isSearching = false;
  private allOptions: Array<IDropdownOption> = [];
  public filteredOptions: Array<IDropdownOption> = [];
  public selectedOption: IDropdownOption;
  private selectedOptions: Array<IDropdownOption> = [];

  private isOpen = false;

  @Input()
  set suiOptions(options: Array<IDropdownOption>) {
    this.allOptions = this.filteredOptions = options;
  }

  get suiOptions(): Array<IDropdownOption> {
    return this.allOptions;
  }

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
    if (this.suiSearch && this.isSearching) {
      return '';
    }

    return this.selectedOption?.text || this.suiPlaceholder;
  }

  public get isDefaultText(): boolean {
    if (!this.selectedOption) {
      return true;
    }

    if (this.suiSearch) {
      return false;
    }

    return !this.selectedOption;
  }

  public get isFilteredText(): boolean {
    if (!this.selectedOption) {
      return true;
    }

    if (this.suiSearch) {
      return false;
    }

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

  public onSearch(searchTerm): void {
    this.isSearching = !!searchTerm;

    // limit the options displayed
    this.filteredOptions = this.allOptions
      .filter((x) => x.text.toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()));
  }

  public isActive(option: IDropdownOption): boolean {
    return this.selectedOption === option;
  }

  public hasNoSearchResults(): boolean {
    if (!this.suiSearch) {
      return false;
    }

    return this.filteredOptions.length === 0;
  }

  public onItemClick(option: IDropdownOption): void {
    const valueChanged = this.selectedOption !== option;
    this.selectedOption = option;

    if (valueChanged) {
      this.suiSelectionChanged.emit(option.value);
    }
  }
}
