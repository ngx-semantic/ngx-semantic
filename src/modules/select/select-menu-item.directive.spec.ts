import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiSelectMenuItemDirective} from './select-menu-item.directive';

@Component({
  standalone: false,
  template: `<div suiSelectMenuItem></div>`
})
class TestHostComponent {}

describe('SuiSelectMenuItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestHostComponent, SuiSelectMenuItemDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiSelectMenuItemDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
