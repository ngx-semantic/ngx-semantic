import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Utils} from '../../common';
import {ISearchOption} from './interfaces/ISearchOption';

export type SuiSearchAlignment = 'right' | null;

@Component({
  selector: 'sui-search',
  template: `
    <ng-container *ngIf="!suiShowIcon">
      <input class="prompt"
             type="text"
             autocomplete="off"
             [placeholder]="suiPlaceholder"
             [(ngModel)]="searchTerm"
             (focus)="onFocus()"
             (keyup)="onSearch()"/>
    </ng-container>

    <ng-container *ngIf="suiShowIcon">
      <div sui-input
           suiIcon="true">
        <input class="prompt"
               type="text"
               [placeholder]="suiPlaceholder"
               [(ngModel)]="searchTerm"
               (focus)="onFocus()"
               (keyup)="onSearch()"/>
        <i sui-icon
           suiIconType="search"></i>
      </div>
    </ng-container>

    <div class="results transition"
         [class.visible]="isOpen"
         [class.hidden]="!isOpen"
         style="display: block !important;">
      <ng-container *ngIf="!hasCategories">
        <ng-container *ngFor="let option of filteredOptions">
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
              </ng-container>
            </div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class SuiSearchComponent {
  @Output() public suiResultSelected = new EventEmitter<ISearchOption>();
  @Input() public suiOptionsLookup: (query: string) => Promise<Array<ISearchOption>>;
  @Input() public suiOptions: Array<ISearchOption> = [];
  @Input() public suiAlignment: SuiSearchAlignment = null;
  @Input() public suiPlaceholder: string = null;
  @Input() public suiSearchDelay = 200;
  @Input() public suiShowIcon = false;
  @Input() public suiDisabled = false;
  @Input() public suiFluid = false;

  // field to track whether there has been an outside click
  private isInsideClick: boolean;
  private isLoading = false;
  private isFocused = false;
  public isOpen: boolean;
  public searchTerm: string;
  public filteredOptions: Array<ISearchOption> = [];
  public selectedOption: ISearchOption;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.isLoading, 'loading'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'search',
      Utils.getPropClass(this.hasCategories, 'category'),
      Utils.getPropClass(this.isFocused, 'focus')
    ].joinWithWhitespaceCleanup();
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
    if (this.suiDisabled) {
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
            console.log(err);
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
