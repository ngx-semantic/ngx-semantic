import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiGridRowDirective, SuiRowAlignment } from './grid-row.directive';
import { SuiGridReverse, SuiGridVerticalAlignment } from './grid.types';
import { SuiGridModule } from './grid.module';
import { SuiColour, SuiDeviceVisibility, SuiWidth } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiGridModule],
  template: `
    <div sui-grid>
      <div suiGridRow
           [suiWidth]="width"
           [suiAlignment]="alignment"
           [suiVerticalAlignment]="verticalAlignment"
           [suiColour]="colour"
           [suiReversed]="reversed"
           [suiDeviceVisibility]="visibility"
           [suiEqual]="equal"
           [suiCentered]="centered"
           [suiStretched]="stretched"
           [suiDoubling]="doubling"></div>
    </div>`
})
class TestHostComponent {
  width: SuiWidth = null;
  alignment: SuiRowAlignment = null;
  verticalAlignment: SuiGridVerticalAlignment = null;
  colour: SuiColour = null;
  reversed: SuiGridReverse | SuiGridReverse[] = null;
  visibility: SuiDeviceVisibility = null;
  equal = false;
  centered = false;
  stretched = false;
  doubling = false;
}

describe('SuiGridRowDirective', () => {
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
    el = fixture.debugElement.query(By.directive(SuiGridRowDirective)).nativeElement;
  });

  const update = (changes: Partial<TestHostComponent>) => {
    Object.assign(host, changes);
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply the base class', () => {
    expect(el.className).toBe('row');
  });

  it('should apply the column count', () => {
    update({ width: 'three' });
    expect(el.className).toContain('three column row');
  });

  it('should apply the equal width class', () => {
    update({ equal: true });
    expect(el.className).toContain('equal width row');
  });

  it('should apply alignment, colour and visibility', () => {
    update({ alignment: 'right aligned', verticalAlignment: 'bottom aligned', colour: 'teal', visibility: 'mobile only' });
    expect(el.className).toContain('right aligned');
    expect(el.className).toContain('bottom aligned');
    expect(el.className).toContain('mobile only');
    expect(el.classList).toContain('teal');
  });

  it('should apply reversed classes', () => {
    update({ reversed: ['computer reversed', 'mobile vertically reversed'] });
    expect(el.className).toContain('computer reversed');
    expect(el.className).toContain('mobile vertically reversed');
  });

  it('should apply the boolean classes', () => {
    update({ centered: true, stretched: true, doubling: true });
    ['centered', 'stretched', 'doubling'].forEach(c => expect(el.classList).toContain(c));
  });
});
