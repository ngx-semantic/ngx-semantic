/**
 * Created by bolor on 10/24/2020
 */

import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Utils} from '../../common';

export type SuiCheckboxType = 'radio' | 'slider' | 'toggle' | null;

@Component({
  selector: 'sui-checkbox',
  template: `
    <input
      class="hidden"
      [attr.type]="inputType"
      [attr.name]="suiName"
      [attr.disabled]="disabled"
      [attr.checked]="checked"
      [attr.value]="suiValue"/>
    <label>
      <ng-content></ng-content>
    </label>
  `
})
export class SuiCheckboxComponent {
  @Output() public valueChanged = new EventEmitter<any>();
  @Output() public checkChanged = new EventEmitter<boolean>();
  @Input() public suiType: SuiCheckboxType = null;
  @Input() public suiValue: any = null;
  @Input() public suiName: string = null;
  @Input() public suiReadOnly = false;
  @Input() public suiDisabled = false;

  public isChecked = false;

  @Input()
  set suiChecked(isChecked: boolean) {
    if (!this.suiReadOnly) {
      if (this.isChecked !== isChecked) {
        this.isChecked = isChecked;
        this.checkChanged.emit(isChecked);
      }
    }
  }

  get suiChecked(): boolean {
    return this.isChecked;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiType,
      Utils.getPropClass(this.suiReadOnly, 'read-only'),
      'checkbox',
      Utils.getPropClass(this.isChecked, 'checked')
    ].joinWithWhitespaceCleanup();
  }

  get inputType(): string {
    if (this.suiType === 'radio') {
      return 'radio';
    }

    return 'checkbox';
  }

  @HostListener('click')
  public onClick(): void {
    if (this.suiDisabled || this.suiReadOnly) {
      return;
    }

    this.isChecked = !this.isChecked;
    this.checkChanged.emit(this.isChecked);
  }

  public get checked(): string | undefined {
    return this.isChecked ? '' : undefined;
  }

  public get disabled(): string | undefined {
    return this.suiDisabled ? 'disabled' : undefined;
  }
}
