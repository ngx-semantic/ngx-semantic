/**
 * Created by bolorundurowb on 1/25/2021
 */

import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';

@Component({
  selector: 'sui-accordion-panel',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="title"
         [class.active]="isOpen"
         (click)="toggle()">
      <i sui-icon
         suiIconType="dropdown"></i>
      {{suiTitle}}
    </div>
    <div class="content"
         [class.active]="isOpen">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiAccordionPanelComponent {
  @Input() public suiTitle = '';
  @Input() @InputBoolean() public disabled = false;
  @Output() public isOpenChange = new EventEmitter<boolean>();

  private _isOpen;

  @Input()
  @InputBoolean()
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(isOpen: boolean) {
    if (!this.disabled) {
      this._isOpen = isOpen;
      this.isOpenChange.emit(isOpen);
    }
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
