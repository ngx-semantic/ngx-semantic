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

    </div>
  `
})
export class SuiSearchComponent {
  @Input() public suiAlignment: SuiSearchAlignment = null;
  @Input() public suiPlaceholder: string = null;
  @Input() public suiShowIcon = false;
  @Input() public suiLoading = false;
  @Input() public suiDisabled = false;
  @Input() public suiFluid = false;
  @Input() public suiOptions: Array<ISearchOption>[];

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'search'
    ].joinWithWhitespaceCleanup();
  }
}
