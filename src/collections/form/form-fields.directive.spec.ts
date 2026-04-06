import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SuiWidth } from 'ngx-semantic/core/enums';
import { SuiFormFieldsDirective } from './form-fields.directive';
import { SuiFormModule } from './form.module';

@Component({
  standalone: true,
  imports: [SuiFormModule],
  template: `
    <div
      suiFormFields
      [suiWidth]="width"
      [suiInline]="inline"
      [suiGrouped]="grouped"
      [suiEqualWidth]="equalWidth"></div>
  `
})
class TestHostComponent {
  @Input() width: SuiWidth = null;
  @Input() inline = false;
  @Input() grouped = false;
  @Input() equalWidth = false;
}

describe('SuiFormFieldsDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiFormFieldsDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should include fields class', () => {
    expect(el.className).toContain('fields');
  });

  it('should add width token when suiWidth is set', () => {
    fixture.componentRef.setInput('width', 'eight');
    fixture.detectChanges();
    expect(el.className).toContain('eight');
  });

  it('should add inline, grouped, and equal width when enabled', () => {
    fixture.componentRef.setInput('inline', true);
    fixture.componentRef.setInput('grouped', true);
    fixture.componentRef.setInput('equalWidth', true);
    fixture.detectChanges();
    const cls = el.className;
    expect(cls).toContain('inline');
    expect(cls).toContain('grouped');
    expect(cls).toContain('equal');
    expect(cls).toContain('width');
  });
});
