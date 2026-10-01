import { expectClasses, expectExactClasses } from '../../test-helpers';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiColumnAlignment, SuiColumnFloat, SuiGridColumnDirective } from './grid-column.directive';
import { SuiGridVerticalAlignment } from './grid.types';
import { SuiGridModule } from './grid.module';
import { SuiColour, SuiDeviceVisibility, SuiWidth } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiGridModule],
  template: `
    <div sui-grid>
      <div suiGridColumn
           [suiWidth]="width"
           [suiMobileWidth]="mobileWidth"
           [suiTabletWidth]="tabletWidth"
           [suiComputerWidth]="computerWidth"
           [suiLargeScreenWidth]="largeScreenWidth"
           [suiWidescreenWidth]="widescreenWidth"
           [suiFloated]="floated"
           [suiColour]="colour"
           [suiAlignment]="alignment"
           [suiVerticalAlignment]="verticalAlignment"
           [suiDeviceVisibility]="visibility"
           [suiStretched]="stretched"></div>
    </div>`
})
class TestHostComponent {
  width: SuiWidth = null;
  mobileWidth: SuiWidth = null;
  tabletWidth: SuiWidth = null;
  computerWidth: SuiWidth = null;
  largeScreenWidth: SuiWidth = null;
  widescreenWidth: SuiWidth = null;
  floated: SuiColumnFloat = null;
  colour: SuiColour = null;
  alignment: SuiColumnAlignment = null;
  verticalAlignment: SuiGridVerticalAlignment = null;
  visibility: SuiDeviceVisibility = null;
  stretched = false;
}

describe('SuiGridColumnDirective', () => {
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
    el = fixture.debugElement.query(By.directive(SuiGridColumnDirective)).nativeElement;
  });

  const update = (changes: Partial<TestHostComponent>) => {
    Object.assign(host, changes);
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply the base class', () => {
    expectExactClasses(el, 'column');
  });

  it('should apply the width', () => {
    update({ width: 'four' });
    expectExactClasses(el, 'four wide column');
  });

  it('should apply responsive widths', () => {
    update({
      mobileWidth: 'sixteen',
      tabletWidth: 'eight',
      computerWidth: 'four',
      largeScreenWidth: 'three',
      widescreenWidth: 'two'
    });
    expectClasses(el, 'sixteen wide mobile');
    expectClasses(el, 'eight wide tablet');
    expectClasses(el, 'four wide computer');
    expectClasses(el, 'three wide large screen');
    expectClasses(el, 'two wide widescreen');
  });

  it('should apply float, alignment and colour', () => {
    update({ floated: 'left floated', alignment: 'right aligned', verticalAlignment: 'top aligned', colour: 'red' });
    expectClasses(el, 'left floated right aligned');
    expectClasses(el, 'top aligned');
    expect(el.classList).toContain('red');
  });

  it('should apply visibility and stretched', () => {
    update({ visibility: 'computer only', stretched: true });
    expectClasses(el, 'computer only');
    expect(el.classList).toContain('stretched');
  });
});
