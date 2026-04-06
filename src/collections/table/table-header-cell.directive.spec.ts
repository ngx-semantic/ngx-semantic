import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiTableHeaderCellDirective } from './table-header-cell.directive';
import { SuiTableModule } from './table.module';

@Component({
  standalone: true,
  imports: [SuiTableModule],
  template: `<div suiTableHeaderCell suiTextAlignment="right"></div>`
})
class TestHostComponent {}

describe('SuiTableHeaderCellDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiTableHeaderCellDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply alignment classes from inputs', () => {
    expect(el.classList).toContain('right');
    expect(el.classList).toContain('aligned');
  });
});
