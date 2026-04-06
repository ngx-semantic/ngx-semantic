import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SuiSize } from 'ngx-semantic/core/enums';
import { SuiFormDirective, type SuiFormState } from './form.directive';
import { SuiFormModule } from './form.module';

@Component({
  standalone: true,
  imports: [SuiFormModule],
  template: `
    <div
      sui-form
      [suiState]="state"
      [suiSize]="size"
      [suiLoading]="loading"
      [suiEqualWidth]="equalWidth"
      [suiInverted]="inverted"
      [suiReply]="reply"></div>
  `
})
class TestHostComponent {
  @Input() state: SuiFormState = null;
  @Input() size: SuiSize = null;
  @Input() loading = false;
  @Input() equalWidth = false;
  @Input() inverted = false;
  @Input() reply = false;
}

describe('SuiFormDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiFormDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply base host classes', () => {
    const cls = el.className;
    expect(cls).toContain('ui');
    expect(cls).toContain('form');
  });

  it('should add state class when suiState is set', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();
    expect(el.className).toContain('error');
  });

  it('should add size class when suiSize is set', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();
    expect(el.className).toContain('large');
  });

  it('should add loading when suiLoading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(el.className).toContain('loading');
  });

  it('should add equal width, inverted, and reply classes when enabled', () => {
    fixture.componentRef.setInput('equalWidth', true);
    fixture.componentRef.setInput('inverted', true);
    fixture.componentRef.setInput('reply', true);
    fixture.detectChanges();
    const cls = el.className;
    expect(cls).toContain('equal');
    expect(cls).toContain('width');
    expect(cls).toContain('inverted');
    expect(cls).toContain('reply');
  });
});
