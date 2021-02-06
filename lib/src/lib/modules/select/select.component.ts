import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Utils} from '../../common';
import {ISelectOption} from './interfaces/ISelectOption';
import {SuiSelectMenuDirective} from './select-menu.directive';

@Component({
  selector: 'sui-select',
  encapsulation: ViewEncapsulation.None,
  template: `
    <i class="dropdown icon"></i>

    <!-- Multiple Select Display -->
    <ng-container *ngIf="suiMultiple">
      <ng-container *ngFor="let option of selectedOptions">
        <a class="ui label transition visible"
           style="display: inline-block !important;">
          <ng-container *ngIf="option.image">
            <img class="ui mini image"
                 [class.avatar]="option.image.avatar"
                 [src]="option.image.src"/>
          </ng-container>
          <ng-container *ngIf="option.flag">
            <i [className]="'flag ' + option.flag"></i>
          </ng-container>

          {{option.text}}

          <i class="delete icon"
             (click)="removeSelection(option, $event)"></i>
        </a>
      </ng-container>

      <div class="default text">{{suiPlaceholder}}</div>
    </ng-container>

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
    <ng-container *ngIf="!suiMultiple">
      <div
        [class.default]="isDefaultText"
        [class.filtered]="isFilteredText"
        [class.text]="true">
        <ng-container *ngIf="selectedOption">
          <ng-container *ngIf="selectedOption.image">
            <img class="ui mini image"
                 [class.avatar]="selectedOption.image.avatar"
                 [src]="selectedOption.image.src"/>
          </ng-container>
          <ng-container *ngIf="selectedOption.flag">
            <i [className]="'flag ' + selectedOption.flag"></i>
          </ng-container>

          {{selectedOption.text}}
        </ng-container>

        <ng-container *ngIf="!selectedOption">
          {{suiPlaceholder}}
        </ng-container>
      </div>
    </ng-container>

    <!-- Drop Down Menu Section -->
    <div suiSelectMenu>
      <ng-container *ngFor="let option of filteredOptions">
        <div suiSelectMenuItem
             [suiValue]="option.value"
             [suiSelected]="isActive(option)"
             [suiMultiple]="suiMultiple"
             (click)="onItemClick(option, $event)">
          <ng-container *ngIf="option.image">
            <img class="ui mini image"
                 [class.avatar]="option.image.avatar"
                 [src]="option.image.src"/>
          </ng-container>
          <ng-container *ngIf="option.flag">
            <i [className]="'flag ' + option.flag"></i>
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
export class SuiSelectComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild(SuiSelectMenuDirective) public optionsMenu: SuiSelectMenuDirective;

  @Output() public suiSelectionChanged = new EventEmitter<any | Array<any>>();
  @Input() public suiPlaceholder: string = null;
  @Input() public suiSearch = false;
  @Input() public suiFluid = false;
  @Input() public suiInline = false;
  @Input() public suiLoading = false;
  @Input() public suiError = false;
  @Input() public disabled = false;
  @Input() public suiScrolling = false;
  @Input() public suiCompact = false;
  @Input() public name: string = null;
  @Input() public suiMultiple = false;

  private isOpen = false;
  private isSearching = false;
  private selectedValues: Array<any> = [];
  public searchTerm: string;
  private allOptions: Array<ISelectOption> = [];
  public filteredOptions: Array<ISelectOption> = [];
  public selectedOption: ISelectOption;
  public selectedOptions: Array<ISelectOption> = [];

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
      Utils.getPropClass(this.disabled, 'disabled'),
      Utils.getPropClass(this.suiScrolling, 'scrolling'),
      'dropdown',
      Utils.getPropClass(this.suiMultiple, 'multiple'),
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
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;

    // handle selection dropdown
    if (this.optionsMenu) {
      this.optionsMenu.suiIsOpen = this.isOpen;
    }
  }

  public ngAfterViewInit(): void {
    if (!this.optionsMenu) {
      throw new Error('An error occurred rendering the options.');
    }
  }

  public onSearch(): void {
    this.isSearching = !!this.searchTerm;

    // if the user is searching, then keep the dropdown open
    if (this.optionsMenu) {
      this.isOpen = true;
      this.optionsMenu.suiIsOpen = true;
    }

    // limit the options displayed
    this.filteredOptions = this.allOptions
      .filter((x) => x.text.toLocaleLowerCase()
        .includes(this.searchTerm.toLocaleLowerCase()));
  }

  public isActive(option: ISelectOption): boolean {
    if (this.suiMultiple) {
      return this.selectedValues.includes(option.value);
    } else {
      return this.selectedOption === option;
    }
  }

  public hasNoSearchResults(): boolean {
    if (!this.suiSearch) {
      return false;
    }

    return this.filteredOptions.length === 0;
  }

  public onItemClick(option: ISelectOption, event: Event): void {
    // handle single select
    if (!this.suiMultiple) {
      const valueChanged = this.selectedOption?.value !== option.value;
      this.selectedOption = option;

      if (valueChanged) {
        this.controlValueChangeFn(option.value);
        this.suiSelectionChanged.emit(option.value);
      }
    }

    // handle multiple  select
    if (this.suiMultiple) {
      const valueChanged = !this.selectedValues.includes(option.value);

      if (valueChanged) {
        this.selectedValues.push(option.value);
        this.selectedOptions.push(option);

        this.controlValueChangeFn(this.selectedValues);
        this.suiSelectionChanged.emit(this.selectedValues);
      }

      event.stopPropagation();
    }

    // clear search
    this.isSearching = false;
    this.searchTerm = '';
  }

  public removeSelection(option: ISelectOption, event: Event): void {
    if (!this.suiMultiple) {
      return;
    }

    if (!this.selectedValues.includes(option.value)) {
      return;
    }

    this.selectedValues = this.selectedValues.filter((x) => x !== option.value);
    this.selectedOptions = this.selectedOptions.filter((x) => x !== option);

    this.controlValueChangeFn(this.selectedValues);
    this.suiSelectionChanged.emit(this.selectedValues);

    event.stopPropagation();
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
