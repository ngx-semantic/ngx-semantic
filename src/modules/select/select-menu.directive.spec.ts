import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiSelectMenuDirective} from './select-menu.directive';

@Component({
  standalone: false,
  template: `<div suiSelectMenu></div>`
})
class TestHostComponent {}

describe('SuiSelectMenuDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestHostComponent, SuiSelectMenuDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiSelectMenuDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
