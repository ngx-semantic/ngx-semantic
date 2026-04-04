import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiPlaceholderHeaderDirective} from './placeholder-header.directive';
import {SuiPlaceholderModule} from './placeholder.module';

@Component({
  standalone: true,
  imports: [SuiPlaceholderModule],
  template: `<div suiPlaceholderHeader></div>`
})
class TestHostComponent {}

describe('SuiPlaceholderHeaderDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiPlaceholderHeaderDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
