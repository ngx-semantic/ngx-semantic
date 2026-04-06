import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {SuiFormValidationDirective} from './form-validation.directive';
import {SUI_FORM_VALIDATION_ERROR_KEY} from './form-validation.model';

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class HostFormComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = {email: ['empty', 'email']};
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SuiFormValidationDirective],
  template: `
    <form [formGroup]="fg" suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <input formControlName="email" id="email" />
      </div>
      <div class="field">
        <input formControlName="extra" id="extra" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class ReactiveHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fg = new FormGroup({
    email: new FormControl(''),
    extra: new FormControl('', Validators.required)
  });
  fields = {email: ['empty', 'email']};
}

describe('SuiFormValidationDirective', () => {
  let fixture: ComponentFixture<HostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HostFormComponent);
    fixture.detectChanges();
  });

  it('blocks submit when a rule fails', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', {cancelable: true, bubbles: true});
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
  });

  it('allows submit when valid', () => {
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', {cancelable: true, bubbles: true});
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).not.toHaveBeenCalled();
  });

  it('validateForm reflects isValid', () => {
    const dir = fixture.componentInstance.fv;
    expect(dir.isValid()).toBe(false);
    expect(dir.validateForm()).toBe(false);
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(dir.isValid()).toBe(true);
  });
});

describe('SuiFormValidationDirective with FormGroup', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  it('sets AbstractControl errors for Semantic rule failures', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    fixture.detectChanges();
    const email = fixture.componentInstance.fg.get('email');
    expect(email?.errors?.[SUI_FORM_VALIDATION_ERROR_KEY]).toBeTruthy();
  });

  it('clears Semantic errors when validation passes', () => {
    fixture.componentInstance.fg.patchValue({email: 'ok@example.com', extra: 'x'});
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.fg.get('email')?.errors?.[SUI_FORM_VALIDATION_ERROR_KEY]).toBeFalsy();
  });

  it('blocks submit when only built-in validators fail', () => {
    fixture.componentInstance.fg.patchValue({email: 'ok@example.com', extra: ''});
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', {cancelable: true, bubbles: true});
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
  });
});
