import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiSelectMenuDirective } from './select-menu.directive';
import { SuiSelectMenuItemDirective } from './select-menu-item.directive';
import { ISelectOption } from './interfaces/ISelectOption';
import { BaseDirective } from 'ngx-semantic/core/base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SuiSelectMenuDirective, SuiSelectMenuItemDirective],
  selector: 'sui-select',
  encapsulation: ViewEncapsulation.None,
  template: `
    <i class="dropdown icon"></i>

    <!-- Multiple Select Display -->
    @if (suiMultiple) {
      @for (option of selectedOptions; track option) {
        <a class="ui label transition visible"
           style="display: inline-block !important;">
          @if (option.image) {
            <img class="ui mini image"
                 alt="Dropdown option image"
                 [class.avatar]="option.image.avatar"
                 [src]="option.image.src"/>
          }
          @if (option.flag) {
            <i [className]="'flag ' + option.flag"></i>
          }

          {{ option.text }}

          <i class="delete icon"
             (click)="removeSelection(option, $event)"></i>
        </a>
      }

      <div class="default text">{{ suiPlaceholder }}</div>
    }

    <!-- Search Section -->
    @if (suiSearch) {
      <input class="search"
             autocomplete="off"
             tabindex="0"
             [(ngModel)]="searchTerm"
             (focus)="onClick()"
             (keyup)="onSearch()">
    }

    <!-- Display Section -->
    @if (!suiMultiple) {
      <div
        [class.default]="isDefaultText"
        [class.filtered]="isFilteredText"
        [class.text]="true">
        @if (selectedOption) {
          @if (selectedOption.image) {
            <img class="ui mini image"
                 alt="Dropdown option image"
                 [class.avatar]="selectedOption.image.avatar"
                 [src]="selectedOption.image.src"/>
          }
          @if (selectedOption.flag) {
            <i [className]="'flag ' + selectedOption.flag"></i>
          }

          {{ selectedOption.text }}
        }

        @if (!selectedOption) {
          {{ suiPlaceholder }}
        }
      </div>
    }

    <!-- Drop Down Menu Section -->
    <div suiSelectMenu>
      @for (option of filteredOptions; track option) {
        <div suiSelectMenuItem
             [suiValue]="option.value"
             [suiSelected]="isActive(option)"
             [suiMultiple]="suiMultiple"
             (click)="onItemClick(option, $event)">
          @if (option.image) {
            <img class="ui mini image"
                 alt="Dropdown option image"
                 [class.avatar]="option.image.avatar"
                 [src]="option.image.src"/>
          }
          @if (option.flag) {
            <i [className]="'flag ' + option.flag"></i>
          }
          {{ option.text }}
        </div>
      }
      @if (hasNoSearchResults()) {
        <div class="message"
             (click)="$event.stopPropagation()">
          No results found.
        </div>
      }
    </div>
  `,
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSelectComponent),
    multi: true
  } ]
})
export class SuiSelectComponent extends BaseDirective implements AfterViewInit, ControlValueAccessor {
  private changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild(SuiSelectMenuDirective) public optionsMenu!: SuiSelectMenuDirective;

  @Output() public suiSelectionChanged = new EventEmitter<any | any[]>();
  @Input() public suiPlaceholder: string | null = null;
  @Input() @InputBoolean() public suiSearch = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiError = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiScrolling = false;
  @Input() @InputBoolean() public suiCompact = false;
  @Input() @InputBoolean() public name: string | null = null;
  @Input() @InputBoolean() public suiMultiple = false;

  private isOpen = false;
  private isSearching = false;
  private modelValue: any;
  private controlTouchedFn: () => void = () => {};
  private selectedValues: any[] = [];
  public searchTerm = '';
  private allOptions: ISelectOption[] = [];
  public filteredOptions: ISelectOption[] = [];
  public selectedOption: ISelectOption | undefined = undefined;
  public selectedOptions: ISelectOption[] = [];

  private controlValueChangeFn: (value: any | any[]) => void = () => {
  }

  @Input()
  set suiOptions(options: ISelectOption[]) {
    this.allOptions = this.filteredOptions = options;
    this.resolveSelection();
  }

  get suiOptions(): ISelectOption[] {
    return this.allOptions;
  }

  @HostBinding('tabindex')
  get tabIndex(): number {
    return 0;
  }

  get classes(): string {
    return ClassUtils.combineToClass([
      'ui',
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      ClassUtils.getPropClass(this.suiSearch, 'search'),
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      'selection',
      ClassUtils.getPropClass(this.suiInline, 'inline'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiScrolling, 'scrolling'),
      'dropdown',
      ClassUtils.getPropClass(this.suiMultiple, 'multiple'),
      ClassUtils.getPropClass(this.isOpen, 'active'),
      ClassUtils.getPropClass(this.isOpen, 'visible'),
      ClassUtils.getPropClass(this.suiError, 'error')
    ]);
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

  @HostListener('focusout', ['$event'])
  public onFocusOut(event: FocusEvent): void {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
      this.controlTouchedFn();
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
      this.modelValue = option.value;
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
        this.updateMultipleSelection([...this.selectedValues, option.value]);
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

    this.updateMultipleSelection(this.selectedValues.filter((value) => !Object.is(value, option.value)));

    event.stopPropagation();
  }

  public writeValue(value: any): void {
    this.modelValue = Array.isArray(value) && this.suiMultiple ? [...value] : value;
    this.resolveSelection();
    this.changeDetectorRef.markForCheck();
  }

  private resolveSelection(): void {
    if (this.suiMultiple) {
      this.selectedValues = Array.isArray(this.modelValue) ? this.modelValue : [];
      const optionsByValue = new Map(this.allOptions.map(option => [option.value, option]));
      this.selectedOptions = [...new Set(this.selectedValues)]
        .map(value => optionsByValue.get(value))
        .filter((option): option is ISelectOption => option !== undefined);
      this.selectedOption = undefined;
      return;
    }
    this.selectedOption = this.modelValue == null
      ? undefined
      : this.allOptions.find(option => option.value === this.modelValue);
    this.selectedValues = [];
    this.selectedOptions = [];
  }

  private updateMultipleSelection(values: any[]): void {
    this.writeValue(values);
    this.controlValueChangeFn([...values]);
    this.suiSelectionChanged.emit([...values]);
  }

  public registerOnChange(fn: any): void {
    this.controlValueChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.controlTouchedFn = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
