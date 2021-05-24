import {Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {ISearchOption} from './interfaces/ISearchOption';

export type SuiSearchAlignment = 'right' | null;

@Component({
  selector: 'sui-search',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [ngClass]="classes">
      <ng-container *ngIf="!suiShowIcon">
        <ng-container
          *ngTemplateOutlet="input"></ng-container>
      </ng-container>

      <ng-container *ngIf="suiLoading || suiShowIcon">
        <div sui-input
             suiIcon="icon">
          <ng-container
            *ngTemplateOutlet="input"></ng-container>

          <ng-container *ngIf="suiShowIcon">
            <i sui-icon
               suiIconType="search"></i>
          </ng-container>
        </div>
      </ng-container>

      <div class="results transition"
           [class.visible]="isOpen"
           [class.hidden]="!isOpen"
           style="display: block !important;">
        <ng-container *ngIf="!hasCategories">
          <ng-container *ngFor="let option of filteredOptions">
            <ng-container
              *ngTemplateOutlet="result; context: {option:option}"></ng-container>
          </ng-container>
        </ng-container>

        <ng-container *ngIf="hasCategories">
          <ng-container *ngFor="let category of optionsByCategory | keyvalue">
            <div class="category">
              <div class="name">
                {{category.key}}
              </div>
              <div class="results">
                <ng-container *ngFor="let option of category.value">
                  <ng-container
                    *ngTemplateOutlet="result; context: {option:option}"></ng-container>
                </ng-container>
              </div>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <ng-template #input>
      <input class="prompt"
             type="text"
             autocomplete="off"
             [placeholder]="suiPlaceholder"
             [(ngModel)]="searchTerm"
             (focus)="onFocus()"
             (keyup)="onSearch()"/>
    </ng-template>

    <ng-template #result let-option='option'>
      <a class="result"
         (click)="optionClicked(option)">
        <div class="content">
          <div class="title">
            {{option.title}}
          </div>

          <ng-container *ngIf="option.description">
            <div class="description">
              {{option.description}}
            </div>
          </ng-container>
        </div>
      </a>
    </ng-template>
  `
})
export class SuiSearchComponent {
  @Output() public suiResultSelected = new EventEmitter<ISearchOption>();
  @Input() public suiOptionsLookup: (query: string) => Promise<Array<ISearchOption>>;
  @Input() public suiOptions: Array<ISearchOption> = [];
  @Input() public suiAlignment: SuiSearchAlignment = null;
  @Input() public suiPlaceholder: string = null;
  @Input() public suiSearchDelay = 200;
  @Input() @InputBoolean() public suiShowIcon = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiLoading = false;

  // field to track whether there has been an outside click
  private isInsideClick: boolean;
  private isLoading = false;
  private isFocused = false;
  public isOpen: boolean;
  public searchTerm: string;
  public filteredOptions: Array<ISearchOption> = [];
  public selectedOption: ISearchOption;

  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiLoading || this.isLoading, 'loading'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      'search',
      ClassUtils.getPropClass(this.hasCategories, 'category'),
      ClassUtils.getPropClass(this.isFocused, 'focus')
    ].join(' ');
  }

  get hasCategories(): boolean {
    return this.suiOptions.some((x) => !!x.category);
  }

  get optionsByCategory(): any {
    return this.filteredOptions
      .reduce((option, a) => {
        const category = a.category || '(None)';
        option[category] = option[a.category] || [];
        option[category].push(a);
        return option;
      }, Object.create(null));
  }

  @HostListener('click')
  public onClick(): void {
    if (this.disabled) {
      return;
    }

    this.isInsideClick = true;
  }

  @HostListener('document:click')
  public onPageClick(): void {
    if (!this.isInsideClick) {
      this.isOpen = false;
    }

    this.isInsideClick = false;
  }

  public onSearch(): void {
    this.isLoading = true;

    setTimeout(() => {
      // if there is a lookup function, then use that
      if (this.suiOptionsLookup) {
        this.suiOptionsLookup(this.searchTerm)
          .then((results) => {
            this.filteredOptions = results;

            // indicate search is complete
            this.isLoading = false;
          })
          .catch((err) => {
            console.error(err);
            this.filteredOptions = [];

            // indicate search is complete
            this.isLoading = false;
          });
      } else {
        // limit the options displayed
        this.filteredOptions = this.suiOptions
          .filter((x) => x.title.toLocaleLowerCase()
            .includes(this.searchTerm.toLocaleLowerCase()));

        // indicate search is complete
        this.isLoading = false;
      }

      this.isOpen = this.filteredOptions.length > 0;
    }, this.suiSearchDelay);
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('onfocusout')
  public onUnfocus(): void {
    this.isOpen = false;
    this.isFocused = false;
  }

  public optionClicked(option: ISearchOption): void {
    this.searchTerm = option.title;
    this.selectedOption = option;
    this.suiResultSelected.emit(option);
    this.isOpen = false;
  }
}
