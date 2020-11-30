import {ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Utils} from '../../common';
import {ISelectOption} from './interfaces/ISelectOption';
import {SuiSelectMenuDirective} from './select-menu.directive';

@Component({
  selector: 'sui-select',
  template: `
    <input
      type="hidden"
      [name]="name">
    <i sui-icon
       suiIconType="dropdown"></i>

    <!-- Search Section -->
    <ng-container *ngIf="suiSearch">
      <input class="search"
             autocomplete="off"
             tabindex="0"
             [(ngModel)]="searchTerm"
             (focus)="onClick()"
             (keyup)="onSearch()">
    </ng-container>

    <!-- Display Section -->
    <div
      [class.default]="isDefaultText"
      [class.filtered]="isFilteredText"
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

        {{selectedOption.text}}
      </ng-container>

      <ng-container *ngIf="!selectedOption">
        {{suiPlaceholder}}
      </ng-container>
    </div>

    <!-- Drop Down Menu Section -->
    <div suiSelectMenu>
      <ng-container *ngFor="let option of filteredOptions">
        <div suiSelectMenuItem
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
             (click)="$event.stopPropagation()">
          No results found.
        </div>
      </ng-container>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSelectComponent),
    multi: true
  }]
})
export class SuiSelectComponent implements ControlValueAccessor {
  @ViewChild(SuiSelectMenuDirective) public optionsMenu: SuiSelectMenuDirective;

  @Output() public suiSelectionChanged = new EventEmitter<any | Array<any>>();
  @Input() public suiSearch = false;
  @Input() public suiFluid = false;
  @Input() public suiInline = false;
  @Input() public suiLoading = false;
  @Input() public suiError = false;
  @Input() public suiDisabled = false;
  @Input() public suiScrolling = false;
  @Input() public suiCompact = false;
  @Input() public suiPlaceholder: string = null;
  @Input() public name: string = null;
  @Input() public suiMultiple = false;

  private isOpen = false;
  private isSearching = false;
  public searchTerm: string;
  private allOptions: Array<ISelectOption> = [];
  public filteredOptions: Array<ISelectOption> = [];
  public selectedOption: ISelectOption;
  private selectedOptions: Array<ISelectOption> = [];

  private controlValueChangeFn: (value: any | Array<any>) => void = () => {
  }

  @Input()
  set suiOptions(options: Array<ISelectOption>) {
    this.allOptions = this.filteredOptions = options;
  }

  get suiOptions(): Array<ISelectOption> {
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
      'selection',
      Utils.getPropClass(this.suiInline, 'inline'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiScrolling, 'scrolling'),
      'dropdown',
      Utils.getPropClass(this.isOpen, 'active'),
      Utils.getPropClass(this.isOpen, 'visible'),
      Utils.getPropClass(this.suiError, 'error')
    ].joinWithWhitespaceCleanup();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public get multiple(): string | undefined {
    return this.suiMultiple ? '' : undefined;
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
    if (!this.suiSearch) {
      return false;
    }

    return this.isSearching;
  }

  @HostListener('click')
  public onClick(): void {
    if (this.suiDisabled) {
      return;
    }

    this.isOpen = !this.isOpen;

    // handle selection dropdown
    if (this.optionsMenu) {
      this.optionsMenu.suiIsOpen = this.isOpen;
    }
  }

  public onSearch(): void {
    this.isSearching = !!this.searchTerm;

    // limit the options displayed
    this.filteredOptions = this.allOptions
      .filter((x) => x.text.toLocaleLowerCase()
        .includes(this.searchTerm.toLocaleLowerCase()));
  }

  public isActive(option: ISelectOption): boolean {
    return this.selectedOption === option;
  }

  public hasNoSearchResults(): boolean {
    if (!this.suiSearch) {
      return false;
    }

    return this.filteredOptions.length === 0;
  }

  public onItemClick(option: ISelectOption): void {
    const valueChanged = this.selectedOption?.value !== option.value;
    this.selectedOption = option;

    if (valueChanged) {
      this.controlValueChangeFn(option.value);
      this.suiSelectionChanged.emit(option.value);
    }

    // clear search
    this.isSearching = false;
    this.searchTerm = '';
  }

  public writeValue(value: any | Array<any>): void {
    const valueChanged = value !== this.selectedOption?.value;

    if (valueChanged) {
      this.suiSelectionChanged.emit(value);
    }

    const matchedOptions = this.allOptions
      .filter((x) => x.value === value);
    this.selectedOption = matchedOptions[0];
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.controlValueChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState?(isDisabled: boolean): void {
  }
}
