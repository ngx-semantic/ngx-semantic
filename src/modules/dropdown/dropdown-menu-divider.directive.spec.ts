import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDropdownMenuDividerDirective } from './dropdown-menu-divider.directive';
import { SuiDropdownModule } from './dropdown.module';

@Component({
  standalone: true,
  imports: [SuiDropdownModule],
  template: `<div suiDropdownMenuDivider></div>`
})
class TestHostComponent {}

describe('SuiDropdownMenuDividerDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiDropdownMenuDividerDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
