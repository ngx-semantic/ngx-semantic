import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiTableRowDirective} from './table-row.directive';
import {SuiTableModule} from './table.module';

@Component({
  standalone: true,
  imports: [SuiTableModule],
  template: `<div suiTableRow [suiActive]="true"></div>`
})
class TestHostComponent {}

describe('SuiTableRowDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiTableRowDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply class when suiActive is true', () => {
    expect(el.classList).toContain('active');
  });
});
