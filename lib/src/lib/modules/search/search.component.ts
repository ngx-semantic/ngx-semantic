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
         [class.hidden]="!isOpen">
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
        <ng-container *ngFor="let category of optionsByCategory">
          <div class="category">
            <div class="name">
              {{(category | keyvalue)?.key}}
            </div>
            <ng-container *ngFor="let option of (category | keyvalue)?.value">
              <div class="results transition"
                   [class.visible]="isOpen"
                   [class.hidden]="isOpen">
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
              </div>
            </ng-container>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class SuiSearchComponent {
  @Output() public suiResultSelected = new EventEmitter<ISearchOption>();
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
  private allOptions: Array<ISearchOption> = [];
  public filteredOptions: Array<ISearchOption> = [];
  public selectedOption: ISearchOption;

  @Input()
  set suiOptions(options: Array<ISearchOption>) {
    this.allOptions = options;
  }

  get suiOptions(): Array<ISearchOption> {
    return this.allOptions;
  }

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

  get optionsByCategory(): Array<any> {
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
      // this.isOpen = !!this.searchTerm;

      // limit the options displayed
      this.filteredOptions = this.allOptions
        .filter((x) => x.title.toLocaleLowerCase()
          .includes(this.searchTerm.toLocaleLowerCase()));

      this.isOpen = this.filteredOptions.length > 0;

      // indicate search is complete
      this.isLoading = false;
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
