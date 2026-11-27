import { Component, EventEmitter, HostListener, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuiInputDirective } from 'ngx-semantic/elements/input';
import { SuiIconDirective } from 'ngx-semantic/elements/icon';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { ISearchOption } from './interfaces/ISearchOption';

export type SuiSearchAlignment = 'right' | null;

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SuiInputDirective, SuiIconDirective],
  selector: 'sui-search',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [ngClass]="classes">
      @if (isSimple) {
        <ng-container
          *ngTemplateOutlet="input"></ng-container>
      }

      @if (!isSimple) {
        <div sui-input
             suiIcon="icon">
          <ng-container
            *ngTemplateOutlet="input"></ng-container>
          <i sui-icon
             suiIconType="search"></i>
        </div>
      }

      <div class="results transition"
           [class.visible]="isOpen"
           [class.hidden]="!isOpen"
           style="display: block !important;">
        @if (!hasCategories) {
          @for (option of filteredOptions; track option) {
            <ng-container
              *ngTemplateOutlet="result; context: {option:option}"></ng-container>
          }
        }

        @if (hasCategories) {
          @for (category of optionsByCategory | keyvalue; track category.key) {
            <div class="category">
              <div class="name">
                {{category.key}}
              </div>
              <div class="results">
                @for (option of category.value; track option) {
                  <ng-container
                    *ngTemplateOutlet="result; context: {option:option}"></ng-container>
                }
              </div>
            </div>
          }
        }
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

          @if (option.description) {
            <div class="description">
              {{option.description}}
            </div>
          }
        </div>
      </a>
    </ng-template>
  `
})
export class SuiSearchComponent implements OnDestroy {
  @Output() public suiResultSelected = new EventEmitter<ISearchOption>();
  @Input() public suiOptionsLookup?: (query: string) => Promise<ISearchOption[]>;
  @Input() public suiOptions: ISearchOption[] = [];
  @Input() public suiAlignment: SuiSearchAlignment = null;
  @Input() public suiPlaceholder: string | null = null;
  @Input() public suiSearchDelay = 200;
  @Input() @InputBoolean() public suiShowIcon = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiLoading = false;

  // field to track whether there has been an outside click
  private isInsideClick = false;
  private isLoading = false;
  private searchTimer?: ReturnType<typeof setTimeout>;
  private requestId = 0;
  private isFocused = false;
  public isOpen = false;
  public searchTerm = '';
  public filteredOptions: ISearchOption[] = [];
  public selectedOption: ISearchOption | undefined = undefined;

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
        option[category] = option[category] || [];
        option[category].push(a);
        return option;
      }, Object.create(null));
  }

  get isSimple(): boolean {
    if (this.suiLoading) {
      return false;
    }

    return !this.suiShowIcon;
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
    const requestId = ++this.requestId;
    const query = this.searchTerm;
    clearTimeout(this.searchTimer);
    this.isLoading = true;
    this.searchTimer = setTimeout(() => {
      if (this.suiOptionsLookup) {
        this.suiOptionsLookup(query).then(
          results => this.applyResults(requestId, results),
          error => {
            if (requestId === this.requestId) {
              console.error(error);
              this.applyResults(requestId, []);
            }
          }
        );
        return;
      }
      const term = query.toLocaleLowerCase();
      this.applyResults(requestId, this.suiOptions.filter(option => option.title.toLocaleLowerCase().includes(term)));
    }, this.suiSearchDelay);
  }

  public ngOnDestroy(): void {
    this.requestId++;
    clearTimeout(this.searchTimer);
  }

  private applyResults(requestId: number, results: ISearchOption[]): void {
    if (requestId !== this.requestId) {
      return;
    }
    this.filteredOptions = results;
    this.isLoading = false;
    this.isOpen = results.length > 0;
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
