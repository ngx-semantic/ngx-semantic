/**
 * Created by bolor on 10/24/2020
 */

import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostListener, Input, Output, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiCheckboxType = 'radio' | 'slider' | 'toggle' | null;

@Component({
  standalone: true,
  selector: 'sui-checkbox',
  encapsulation: ViewEncapsulation.None,
  template: `
    <input #nativeInput
      class="hidden"
      tabindex="0"
      [attr.type]="suiType === 'radio' ? 'radio' : 'checkbox'"
      [attr.name]="name"
      [disabled]="disabled"
      [checked]="isChecked"
      (change)="onNativeChange(nativeInput)"
      (blur)="onBlur()"
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
export class SuiCheckboxComponent extends BaseDirective implements ControlValueAccessor {
  private changeDetectorRef = inject(ChangeDetectorRef);

  @Output() public valueChanged = new EventEmitter<any>();
  @Output() public checkedChange = new EventEmitter<boolean>();
  @Input() public suiType: SuiCheckboxType = null;
  @Input() public name: string | null = null;
  @Input() public suiValue: any = null;
  @Input() @InputBoolean() public suiReadOnly = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public disabled = false;

  @ViewChild('nativeInput', { static: true }) private nativeInput!: ElementRef<HTMLInputElement>;

  private controlTouchedFn: () => void = () => {};
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

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (this.disabled || this.suiReadOnly) {
      event.preventDefault();
      return;
    }
    const input = this.nativeInput.nativeElement;
    if (event.target !== input) {
      input.click();
    }
  }

  public onNativeChange(input: HTMLInputElement): void {
    this.isChecked = input.checked;
    if (this.isRadioType) {
      this.currentValue = this.suiValue;
      this.valueChanged.emit(this.currentValue);
      this.controlValueChangeFn(this.currentValue);
    } else {
      this.checkedChange.emit(this.isChecked);
      this.controlValueChangeFn(this.isChecked);
    }
  }

  public onBlur(): void {
    this.controlTouchedFn();
  }

  get isRadioType(): boolean {
    return this.suiType === 'radio';
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
      this.isChecked = !!value;
    }

    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.controlValueChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.controlTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }
}
