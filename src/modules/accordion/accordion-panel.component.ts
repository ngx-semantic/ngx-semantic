/**
 * Created by bolorundurowb on 1/25/2021
 */

import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';
import {SuiIconDirective} from 'ngx-semantic/elements/icon';

@Component({
  standalone: true,
  imports: [SuiIconDirective],
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

  private _isOpen = false;

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
