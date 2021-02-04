/**
 * Created by bolor on 5/10/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {SuiRailDirective} from './rail.directive';

describe('SuiRailComponent', () => {
  let component: TestRailComponent;
  let fixture: ComponentFixture<TestRailComponent>;
  let railElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestRailComponent, SuiRailDirective]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    railElement = fixture.debugElement.query(By.directive(SuiRailDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(railElement.className).toContain('ui');
    expect(railElement.className).toContain('rail');
  });

  it('should apply class name by size', () => {
    component.suiSize = 'mini';
    fixture.detectChanges();
    expect(railElement.classList).toContain('mini');
    component.suiSize = 'tiny';
    fixture.detectChanges();
    expect(railElement.classList).toContain('tiny');
    component.suiSize = 'small';
    fixture.detectChanges();
    expect(railElement.classList).toContain('small');
    component.suiSize = 'medium';
    fixture.detectChanges();
    expect(railElement.classList).toContain('medium');
    component.suiSize = 'large';
    fixture.detectChanges();
    expect(railElement.classList).toContain('large');
    component.suiSize = 'big';
    fixture.detectChanges();
    expect(railElement.classList).toContain('big');
    component.suiSize = 'huge';
    fixture.detectChanges();
    expect(railElement.classList).toContain('huge');
    component.suiSize = 'massive';
    fixture.detectChanges();
    expect(railElement.classList).toContain('massive');
  });

  it('should apply class name by closeness', () => {
    component.suiCloseness = 'close';
    fixture.detectChanges();
    expect(railElement.classList).toContain('close');
    component.suiCloseness = 'very close';
    fixture.detectChanges();
    expect(railElement.classList).toContain('close');
    expect(railElement.classList).toContain('very');
  });

  it('should apply class name by location', () => {
    component.suiLocation = 'left';
    fixture.detectChanges();
    expect(railElement.classList).toContain('left');
    component.suiCloseness = 'right';
    fixture.detectChanges();
    expect(railElement.classList).toContain('right');
  });

  it('should apply class name if dividing', () => {
    component.suiDividing = true;
    fixture.detectChanges();
    expect(railElement.classList).toContain('dividing');
  });

  it('should apply class name if attached', () => {
    component.suiAttached = true;
    fixture.detectChanges();
    expect(railElement.classList).toContain('attached');
  });

  it('should apply class name if internal', () => {
    component.suiInternal = true;
    fixture.detectChanges();
    expect(railElement.classList).toContain('internal');
  });
});

@Component({
  template: `
    <div
      sui-rail
      [suiSize]="suiSize"
      [suiLocation]="suiLocation"
      [suiCloseness]="suiCloseness"
      [suiInternal]="suiInternal"
      [suiDividing]="suiDividing"
      [suiAttached]="suiAttached">
    </div>
  `
})
export class TestRailComponent {
  @Input() suiLocation = null;
  @Input() suiSize = null;
  @Input() suiCloseness = null;
  @Input() suiInternal = false;
  @Input() suiDividing = false;
  @Input() suiAttached = false;
}
