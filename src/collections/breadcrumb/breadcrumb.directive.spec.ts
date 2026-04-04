import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiBreadcrumbDirective} from './breadcrumb.directive';
import {SuiBreadcrumbModule} from './breadcrumb.module';

@Component({
  standalone: true,
  imports: [SuiBreadcrumbModule],
  template: `<div sui-breadcrumb></div>`
})
class TestHostComponent {}

describe('SuiBreadcrumbDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiBreadcrumbDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
