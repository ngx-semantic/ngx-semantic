import { expectClasses, expectExactClasses } from '../../test-helpers';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiGridDirective, SuiGridAlignment, SuiGridCellType, SuiGridDivision, SuiGridPadding, SuiGridRelaxation } from './grid.directive';
import { SuiGridReverse, SuiGridVerticalAlignment } from './grid.types';
import { SuiGridModule } from './grid.module';
import { SuiWidth } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiGridModule],
  template: `
    <div sui-grid
         [suiWidth]="width"
         [suiAlignment]="alignment"
         [suiVerticalAlignment]="verticalAlignment"
         [suiDivided]="divided"
         [suiCelled]="celled"
         [suiPadded]="padded"
         [suiReversed]="reversed"
         [suiRelaxation]="relaxation"
         [suiEqual]="equal"
         [suiCentered]="centered"
         [suiContainer]="container"
         [suiStackable]="stackable"
         [suiDoubling]="doubling"
         [suiStretched]="stretched"></div>`
})
class TestHostComponent {
  width: SuiWidth = null;
  alignment: SuiGridAlignment = null;
  verticalAlignment: SuiGridVerticalAlignment = null;
  divided: SuiGridDivision = null;
  celled: SuiGridCellType = null;
  padded: SuiGridPadding = null;
  reversed: SuiGridReverse | SuiGridReverse[] = null;
  relaxation: SuiGridRelaxation = null;
  equal = false;
  centered = false;
  container = false;
  stackable = false;
  doubling = false;
  stretched = false;
}

describe('SuiGridDirective', () => {
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
    el = fixture.debugElement.query(By.directive(SuiGridDirective)).nativeElement;
  });

  const update = (changes: Partial<TestHostComponent>) => {
    Object.assign(host, changes);
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply the base classes', () => {
    expectExactClasses(el, 'ui grid');
  });

  it('should apply the column count', () => {
    update({ width: 'four' });
    expectClasses(el, 'four column grid');
  });

  it('should apply the equal width class', () => {
    update({ equal: true });
    expectClasses(el, 'equal width grid');
  });

  it('should apply the padded classes', () => {
    update({ padded: 'padded' });
    expect(el.classList).toContain('padded');
    update({ padded: 'vertically padded' });
    expectClasses(el, 'vertically padded');
    update({ padded: 'horizontally padded' });
    expectClasses(el, 'horizontally padded');
  });

  it('should apply the divided and celled classes', () => {
    update({ divided: 'vertically divided', celled: 'internally celled' });
    expectClasses(el, 'vertically divided');
    expectClasses(el, 'internally celled');
  });

  it('should apply alignments', () => {
    update({ alignment: 'center aligned', verticalAlignment: 'middle aligned' });
    expectClasses(el, 'center aligned');
    expectClasses(el, 'middle aligned');
  });

  it('should apply one or many reversed classes', () => {
    update({ reversed: 'computer reversed' });
    expectClasses(el, 'computer reversed');
    update({ reversed: ['mobile reversed', 'tablet vertically reversed'] });
    expectClasses(el, 'mobile reversed');
    expectClasses(el, 'tablet vertically reversed');
  });

  it('should apply the boolean classes', () => {
    update({ centered: true, stackable: true, doubling: true, stretched: true, container: true });
    ['centered', 'stackable', 'doubling', 'stretched', 'container'].forEach(c => expect(el.classList).toContain(c));
  });

  it('should apply the relaxation class', () => {
    update({ relaxation: 'very relaxed' });
    expectClasses(el, 'very relaxed');
  });
});
