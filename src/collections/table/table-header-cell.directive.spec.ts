import { expectClasses, expectExactClasses } from '../../test-helpers';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiTableHeaderCellDirective } from './table-header-cell.directive';
import { SuiTableModule } from './table.module';
import { SuiTableSortDirection, SuiTableTextAlignment } from './enums';
import { SuiWidth } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiTableModule],
  template: `
    <table>
      <thead>
      <tr>
        <th suiTableHeaderCell
            [suiTextAlignment]="alignment"
            [suiWidth]="width"
            [suiSorted]="sorted"
            [suiSingleLine]="singleLine"></th>
      </tr>
      </thead>
    </table>`
})
class TestHostComponent {
  alignment: SuiTableTextAlignment = 'right';
  width: SuiWidth = null;
  sorted: SuiTableSortDirection = null;
  singleLine = false;
}

describe('SuiTableHeaderCellDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiTableHeaderCellDirective)).nativeElement;
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply alignment classes from inputs', () => {
    expectExactClasses(el, 'right aligned');
  });

  it('should include the width value in the class', () => {
    host.width = 'ten';
    fixture.detectChanges();
    expectClasses(el, 'ten wide');
  });

  it('should apply sorted and single line classes', () => {
    host.sorted = 'descending';
    host.singleLine = true;
    fixture.detectChanges();
    expectClasses(el, 'sorted descending');
    expectClasses(el, 'single line');
  });
});
