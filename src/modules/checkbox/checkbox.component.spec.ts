import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiCheckboxModule } from './checkbox.module';
import { SuiCheckboxComponent } from './checkbox.component';

@Component({
  imports: [ReactiveFormsModule, SuiCheckboxComponent],
  template: '<sui-checkbox [formControl]="control" suiType="slider">Slider</sui-checkbox>'
})
class CheckboxFormHost {
  readonly control = new FormControl(false);
}

describe('SuiCheckboxComponent', () => {
  let fixture: ComponentFixture<SuiCheckboxComponent>;
  let component: SuiCheckboxComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiCheckboxModule, CheckboxFormHost]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiCheckboxComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ui checkbox classes', () => {
    expect(host.className).toContain('ui');
    expect(host.className).toContain('checkbox');
  });

  it('should toggle checked on click for default checkbox', () => {
    expect(component.isChecked).toBe(false);
    host.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    host.click();
    expect(component.isChecked).toBe(false);
  });

  it('should set radio input type when suiType is radio', () => {
    fixture.componentRef.setInput('suiType', 'radio');
    fixture.componentRef.setInput('suiValue', 'a');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.type).toBe('radio');
  });

  it('writeValue should set checked state for radio based on suiValue', () => {
    fixture.componentRef.setInput('suiType', 'radio');
    fixture.componentRef.setInput('suiValue', 'x');
    fixture.detectChanges();
    component.writeValue('x');
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('sets the live checked property on every model write', () => {
    const input = host.querySelector('input')!;
    for (const value of [true, true, false, false]) {
      component.writeValue(value);
      fixture.detectChanges();
      expect(input.checked).toBe(value);
    }
  });

  it('toggles a slider as a boolean and honors Forms touched and disabled state', () => {
    const formFixture = TestBed.createComponent(CheckboxFormHost);
    formFixture.detectChanges();
    const control = formFixture.componentInstance.control;
    const input = (formFixture.nativeElement as HTMLElement).querySelector('input')!;
    input.click();
    expect(control.value).toBeTrue();
    input.click();
    expect(control.value).toBeFalse();
    expect(control.touched).toBeFalse();
    input.dispatchEvent(new FocusEvent('blur'));
    expect(control.touched).toBeTrue();
    control.disable();
    formFixture.detectChanges();
    expect(input.disabled).toBeTrue();
    input.click();
    expect(control.value).toBeFalse();
  });
});
