import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SuiFormValidationDirective } from './form-validation.directive';
import { SUI_FORM_VALIDATION_ERROR_KEY } from './form-validation.model';

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
  fields = { email: ['empty', 'email'] };
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
  fields = { email: ['empty', 'email'] };
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form
      suiFormValidation
      [suiFields]="fields"
      [suiInline]="true"
      (suiOnFailure)="onFail($event)"
      (suiOnSuccess)="onOk($event)"
      #fv="suiFormValidation">
      <div class="ui error message hidden"></div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class EmitHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = { email: ['empty'] };
  failures: { errors: string[]; fields: string[] }[] = [];
  successes: Event[] = [];

  onFail(e: { errors: string[]; fields: string[] }): void {
    this.failures.push(e);
  }

  onOk(e: Event): void {
    this.successes.push(e);
  }
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="false" #fv="suiFormValidation">
      <div class="field">
        <input name="code" type="text" />
        <div class="prompt"></div>
      </div>
    </form>
  `
})
class NonInlineHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = { code: 'empty' };
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form
      suiFormValidation
      [suiFields]="fields"
      [suiOn]="'blur'"
      [suiDelay]="false"
      [suiInline]="true"
      #fv="suiFormValidation">
      <div class="field">
        <input name="email" type="text" />
      </div>
    </form>
  `
})
class BlurHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = { email: ['empty', 'email'] };
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" [suiKeyboardShortcuts]="true" #fv="suiFormValidation">
      <div class="field">
        <input name="x" type="text" />
      </div>
    </form>
  `
})
class KeyboardHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = { x: 'empty' };
}

@Component({
  standalone: true,
  imports: [FormsModule, SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <input name="email" ngModel />
      </div>
    </form>
  `
})
class NgModelHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = { email: 'email' };
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <input name="parent" type="text" />
      </div>
      <div class="field">
        <input name="child" type="text" />
      </div>
    </form>
  `
})
class DependsHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = {
    child: { identifier: 'child', rules: ['empty'], depends: 'parent' }
  };
}

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <input name="nickname" type="text" />
      </div>
    </form>
  `
})
class OptionalHostComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = {
    nickname: { rules: ['empty'], optional: true }
  };
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
    const ev = new Event('submit', { cancelable: true, bubbles: true });
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
  });

  it('allows submit when valid but always prevents native navigation', () => {
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', { cancelable: true, bubbles: true });
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
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

  it('exposes getFieldElement and native getValue / setValue / getValues', () => {
    const dir = fixture.componentInstance.fv;
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    expect(dir.getFieldElement('email')).toBe(input);
    input.value = 'a@b.co';
    expect(dir.getValue('email')).toBe('a@b.co');
    dir.setValue('email', 'z@z.co');
    expect(input.value).toBe('z@z.co');
    expect(dir.getValues(['email'])).toEqual(jasmine.objectContaining({ email: 'z@z.co' }));
  });

  it('validateField updates a single field', () => {
    const dir = fixture.componentInstance.fv;
    expect(dir.validateField('email')).toBe(false);
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    fixture.detectChanges();
    expect(dir.validateField('email')).toBe(true);
  });

  it('isValid(identifier) scopes to one field', () => {
    const dir = fixture.componentInstance.fv;
    expect(dir.isValid('email')).toBe(false);
  });

  it('clears native inputs via clear()', () => {
    const dir = fixture.componentInstance.fv;
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'x';
    dir.clear();
    expect(input.value).toBe('');
  });

  it('reset restores cached defaults', () => {
    const dir = fixture.componentInstance.fv;
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'initial@x.com';
    dir.validateForm();
    input.value = 'changed';
    dir.reset();
    expect(input.value).toBe('initial@x.com');
  });
});

describe('SuiFormValidationDirective emits', () => {
  let fixture: ComponentFixture<EmitHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(EmitHostComponent);
    fixture.detectChanges();
  });

  it('emits suiOnFailure on invalid submit', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    expect(fixture.componentInstance.failures.length).toBe(1);
    expect(fixture.componentInstance.failures[0].fields).toContain('email');
  });

  it('emits suiOnSuccess when validateForm passes', () => {
    const host = fixture.componentInstance;
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'any';
    fixture.detectChanges();
    expect(host.fv.validateForm()).toBe(true);
    expect(host.successes.length).toBe(1);
  });

  it('renders form-level error list into .ui.error.message', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    const block = fixture.debugElement.query(By.css('.ui.error.message')).nativeElement as HTMLElement;
    expect(block.querySelector('ul.list')).toBeTruthy();
    expect(block.textContent).toContain('Email');
  });
});

describe('SuiFormValidationDirective non-inline prompt', () => {
  let fixture: ComponentFixture<NonInlineHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(NonInlineHostComponent);
    fixture.detectChanges();
  });

  it('toggles error class and hides prompt when not inline', () => {
    const dir = fixture.componentInstance.fv;
    dir.validateField('code');
    const field = fixture.debugElement.query(By.css('.field')).nativeElement as HTMLElement;
    expect(field.classList.contains('error')).toBe(true);
    const prompt = field.querySelector('.prompt') as HTMLElement;
    expect(prompt.style.display).toBe('none');
  });
});

describe('SuiFormValidationDirective blur trigger', () => {
  let fixture: ComponentFixture<BlurHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(BlurHostComponent);
    fixture.detectChanges();
  });

  it('validates on blur when suiOn is blur', fakeAsync(() => {
    const input = fixture.debugElement.query(By.css('[name="email"]')).nativeElement as HTMLInputElement;
    input.value = 'bad';
    input.dispatchEvent(new Event('blur'));
    tick(0);
    fixture.detectChanges();
    const field = fixture.debugElement.query(By.css('.field')).nativeElement as HTMLElement;
    expect(field.classList.contains('error')).toBe(true);
  }));
});

describe('SuiFormValidationDirective keyboard', () => {
  let fixture: ComponentFixture<KeyboardHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(KeyboardHostComponent);
    fixture.detectChanges();
  });

  it('blurs active element on Escape inside form', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.focus();
    expect(document.activeElement).toBe(input);
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    input.dispatchEvent(ev);
    expect(document.activeElement).not.toBe(input);
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
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    fixture.detectChanges();
    const email = fixture.componentInstance.fg.get('email');
    expect(email?.errors?.[SUI_FORM_VALIDATION_ERROR_KEY]).toBeTruthy();
  });

  it('clears Semantic errors when validation passes', () => {
    fixture.componentInstance.fg.patchValue({ email: 'ok@example.com', extra: 'x' });
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.fg.get('email')?.errors?.[SUI_FORM_VALIDATION_ERROR_KEY]).toBeFalsy();
  });

  it('blocks submit when only built-in validators fail', () => {
    fixture.componentInstance.fg.patchValue({ email: 'ok@example.com', extra: '' });
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', { cancelable: true, bubbles: true });
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
  });

  it('getAngularForm and resolveControl return reactive group', () => {
    const dir = fixture.componentInstance.fv;
    expect(dir.getAngularForm()).toBe(fixture.componentInstance.fg);
    expect(dir.resolveControl('email')).toBe(fixture.componentInstance.fg.get('email'));
  });

  it('getValue uses control value when bound', () => {
    fixture.componentInstance.fg.patchValue({ email: 'c@d.com' });
    fixture.detectChanges();
    expect(fixture.componentInstance.fv.getValue('email')).toBe('c@d.com');
  });

  it('setValues patches multiple controls', () => {
    fixture.componentInstance.fv.setValues({ email: 'a@b.com', extra: 'ok' });
    expect(fixture.componentInstance.fg.value).toEqual(
      jasmine.objectContaining({ email: 'a@b.com', extra: 'ok' })
    );
  });
});

describe('SuiFormValidationDirective with NgForm', () => {
  let fixture: ComponentFixture<NgModelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgModelHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(NgModelHostComponent);
    fixture.detectChanges();
  });

  it('resolves NgForm group from getAngularForm', () => {
    const g = fixture.componentInstance.fv.getAngularForm();
    expect(g).toBeTruthy();
    expect(g?.get('email')).toBeTruthy();
  });
});

describe('SuiFormValidationDirective depends and optional', () => {
  it('skips dependent field rules when depends value is empty', async () => {
    await TestBed.configureTestingModule({ imports: [DependsHostComponent] }).compileComponents();
    const fix = TestBed.createComponent(DependsHostComponent);
    fix.detectChanges();
    expect(fix.componentInstance.fv.isValid()).toBe(true);
  });

  it('runs dependent rules when depends has a value', async () => {
    await TestBed.configureTestingModule({ imports: [DependsHostComponent] }).compileComponents();
    const fix = TestBed.createComponent(DependsHostComponent);
    fix.detectChanges();
    const parent = fix.debugElement.query(By.css('[name="parent"]')).nativeElement as HTMLInputElement;
    parent.value = 'x';
    fix.detectChanges();
    expect(fix.componentInstance.fv.isValid()).toBe(false);
  });

  it('treats optional empty fields as valid', async () => {
    await TestBed.configureTestingModule({ imports: [OptionalHostComponent] }).compileComponents();
    const fix = TestBed.createComponent(OptionalHostComponent);
    fix.detectChanges();
    expect(fix.componentInstance.fv.isValid()).toBe(true);
  });
});
