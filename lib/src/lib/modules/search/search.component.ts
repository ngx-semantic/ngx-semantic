import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {ISearchOption} from './interfaces/ISearchOption';

export type SuiSearchAlignment = 'right' | null;

@Component({
  selector: 'sui-search',
  template: `
    <ng-container *ngIf="!suiShowIcon">
      <input class="prompt"
             type="text"
             [placeholder]="suiPlaceholder"/>
    </ng-container>

    <ng-container *ngIf="suiShowIcon">
      <div sui-input
           suiIcon="true">
        <input class="prompt"
               type="text"
               [placeholder]="suiPlaceholder"/>
        <i sui-icon
           suiIconType="search"></i>
      </div>
    </ng-container>

    <div class="results">
      <ng-container *ngIf="!hasCategories">
        <ng-container *ngFor="let option of suiOptions">
          <a class="result">
            <div class="content">
              <div class="title">
                {{option.title}}
              </div>
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
            <ng-container *ngFor="let option of category.value">
              <div class="results">
                <a class="result">
                  <div class="content">
                    <div class="title">
                      {{option.title}}
                    </div>
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
  @Input() public suiAlignment: SuiSearchAlignment = null;
  @Input() public suiPlaceholder: string = null;
  @Input() public suiShowIcon = false;
  @Input() public suiDisabled = false;
  @Input() public suiFluid = false;
  @Input() public suiOptions: Array<ISearchOption> = [];

  private isLoading = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.isLoading, 'loading'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'search',
      Utils.getPropClass(this.hasCategories, 'category')
    ].joinWithWhitespaceCleanup();
  }

  get hasCategories(): boolean {
    return this.suiOptions.some((x) => !!x.category);
  }

  get optionsByCategory(): Array<any> {
    return this.suiOptions.reduce((option, a) => {
      option[a.category] = option[a.category] || [];
      option[a.category].push(a);
      return option;
    }, Object.create(null));
  }
}
