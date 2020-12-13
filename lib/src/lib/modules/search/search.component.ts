import {Component, HostBinding, Input} from '@angular/core';

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
  @Input() public suiPlaceholder: string = null;
  @Input() public suiShowIcon = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'search'
    ].joinWithWhitespaceCleanup();
  }
}
