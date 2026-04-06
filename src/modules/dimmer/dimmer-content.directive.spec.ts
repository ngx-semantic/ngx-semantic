import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDimmerContentDirective } from './dimmer-content.directive';
import { SuiDimmerModule } from './dimmer.module';

@Component({
  standalone: true,
  imports: [SuiDimmerModule],
  template: `<div suiDimmerContent></div>`
})
class TestHostComponent {}

describe('SuiDimmerContentDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should attach as template marker (no host class binding)', () => {
    expect(fixture.debugElement.query(By.directive(SuiDimmerContentDirective))).toBeTruthy();
  });
});
