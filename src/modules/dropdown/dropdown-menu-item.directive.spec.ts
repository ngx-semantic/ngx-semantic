import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDropdownMenuItemDirective } from './dropdown-menu-item.directive';
import { SuiDropdownModule } from './dropdown.module';

@Component({
  standalone: true,
  imports: [SuiDropdownModule],
  template: `<div suiDropdownMenuItem></div>`
})
class TestHostComponent {}

describe('SuiDropdownMenuItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiDropdownMenuItemDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
