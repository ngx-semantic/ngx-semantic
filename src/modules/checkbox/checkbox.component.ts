/**
 * Created by bolor on 10/24/2020
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiCheckboxType = 'radio' | 'slider' | 'toggle' | null;

@Component({
  selector: 'sui-checkbox',
  encapsulation: ViewEncapsulation.None,
  template: `
    <input
      class="hidden"
      tabindex="0"
      [attr.type]="suiType === 'radio' ? 'radio' : 'checkbox'"
      [attr.name]="name"
      [attr.disabled]="disabledAttribute"
      [attr.checked]="rawCheckedAttribute"
      [attr.value]="suiValue"/>
    <label>
      <ng-content></ng-content>
    </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiCheckboxComponent),
    multi: true
  }]
})
export class SuiCheckboxComponent implements ControlValueAccessor {
  @Output() public valueChanged = new EventEmitter<any>();
  @Output() public checkedChange = new EventEmitter<boolean>();
  @Input() public suiType: SuiCheckboxType = null;
  @Input() public name: string = null;
  @Input() public suiValue: any = null;
  @Input() @InputBoolean() public suiReadOnly = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public disabled = false;

  public isChecked = false;
  public currentValue: any;
  private controlValueChangeFn: (value: any) => void = () => {
  }

  @Input()
  get checked(): boolean {
    return this.isChecked;
  }

  set checked(isChecked: boolean) {
    this.isChecked = isChecked;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiType,
      ClassUtils.getPropClass(this.suiReadOnly, 'read-only'),
      ClassUtils.getPropClass(this.suiFitted, 'fitted'),
      'checkbox',
      ClassUtils.getPropClass(this.isChecked, 'checked')
    ].join(' ');
  }

  @HostListener('click')
  public onClick(): void {
    if (this.disabled || this.suiReadOnly) {
      return;
    }

    if (this.isRadioType) {
      this.currentValue = this.suiValue;
      this.isChecked = this.currentValue === this.suiValue;
      this.valueChanged.emit(this.currentValue);
      this.controlValueChangeFn(this.currentValue);
    } else {
      this.isChecked = !this.isChecked;
      this.checkedChange.emit(this.isChecked);
      this.controlValueChangeFn(this.isChecked);
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  get isRadioType(): boolean {
    return ['radio', 'slider'].includes(this.suiType);
  }

  public get rawCheckedAttribute(): string | undefined {
    return this.isChecked ? '' : undefined;
  }

  public get disabledAttribute(): string | undefined {
    return this.disabled ? 'disabled' : undefined;
  }

  public writeValue(value: any): void {
    if (this.isRadioType) {
      const isChecked = this.suiValue === value;

      if (this.currentValue !== value) {
        this.valueChanged.emit(value);
      }

      if (this.isChecked !== isChecked) {
        this.checkedChange.emit(isChecked);
      }

      this.currentValue = value;
      this.isChecked = isChecked;
    } else {
      this.isChecked = !this.isChecked;
    }

    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.controlValueChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState?(isDisabled: boolean): void {
  }
}
