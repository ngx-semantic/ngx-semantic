import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiPopupDirective } from './popup.directive';
import { SuiPopupModule } from './popup.module';

@Component({
  standalone: true,
  imports: [SuiPopupModule],
  template: `<div sui-popup></div>`
})
class TestHostComponent {}

describe('SuiPopupDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should attach without host CSS (classes live on overlay popup)', () => {
    expect(fixture.debugElement.query(By.directive(SuiPopupDirective))).toBeTruthy();
    expect(el.className.trim().length).toBe(0);
  });
});
