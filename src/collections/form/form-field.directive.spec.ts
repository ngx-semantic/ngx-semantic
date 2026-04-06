import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SuiWidth } from 'ngx-semantic/core/enums';
import { SuiFormFieldDirective } from './form-field.directive';
import { SuiFormModule } from './form.module';

@Component({
  standalone: true,
  imports: [SuiFormModule],
  template: `
    <div
      suiFormField
      [suiWidth]="width"
      [suiError]="error"
      [suiInline]="inline"
      [disabled]="disabled"
      [suiRequired]="required"></div>
  `
})
class TestHostComponent {
  @Input() width: SuiWidth = null;
  @Input() error = false;
  @Input() inline = false;
  @Input() disabled = false;
  @Input() required = false;
}

describe('SuiFormFieldDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiFormFieldDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should include field class', () => {
    expect(el.className).toContain('field');
  });

  it('should add width and wide when suiWidth is set', () => {
    fixture.componentRef.setInput('width', 'four');
    fixture.detectChanges();
    const cls = el.className;
    expect(cls).toContain('four');
    expect(cls).toContain('wide');
  });

  it('should add error class when suiError is true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    expect(el.className).toContain('error');
  });

  it('should add inline, disabled, and required classes when set', () => {
    fixture.componentRef.setInput('inline', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const cls = el.className;
    expect(cls).toContain('inline');
    expect(cls).toContain('disabled');
    expect(cls).toContain('required');
  });
});
