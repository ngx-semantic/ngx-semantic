/**
 * Created by bolor on 5/10/2020
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {SuiRailDirective} from './rail.directive';

describe('SuiRailComponent', () => {
  let component: TestRailComponent;
  let fixture: ComponentFixture<TestRailComponent>;
  let railElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CommonModule, TestRailComponent, SuiRailDirective],
      })
      .compileComponents();
  });

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
    fixture.componentRef.setInput('suiSize', 'mini');
    fixture.detectChanges();
    expect(railElement.classList).toContain('mini');
    fixture.componentRef.setInput('suiSize', 'tiny');
    fixture.detectChanges();
    expect(railElement.classList).toContain('tiny');
    fixture.componentRef.setInput('suiSize', 'small');
    fixture.detectChanges();
    expect(railElement.classList).toContain('small');
    fixture.componentRef.setInput('suiSize', 'medium');
    fixture.detectChanges();
    expect(railElement.classList).toContain('medium');
    fixture.componentRef.setInput('suiSize', 'large');
    fixture.detectChanges();
    expect(railElement.classList).toContain('large');
    fixture.componentRef.setInput('suiSize', 'big');
    fixture.detectChanges();
    expect(railElement.classList).toContain('big');
    fixture.componentRef.setInput('suiSize', 'huge');
    fixture.detectChanges();
    expect(railElement.classList).toContain('huge');
    fixture.componentRef.setInput('suiSize', 'massive');
    fixture.detectChanges();
    expect(railElement.classList).toContain('massive');
  });

  it('should apply class name by closeness', () => {
    fixture.componentRef.setInput('suiCloseness', 'close');
    fixture.detectChanges();
    expect(railElement.classList).toContain('close');
    fixture.componentRef.setInput('suiCloseness', 'very close');
    fixture.detectChanges();
    expect(railElement.classList).toContain('close');
    expect(railElement.classList).toContain('very');
  });

  it('should apply class name by location', () => {
    fixture.componentRef.setInput('suiLocation', 'left');
    fixture.detectChanges();
    expect(railElement.classList).toContain('left');
    fixture.componentRef.setInput('suiLocation', 'right');
    fixture.detectChanges();
    expect(railElement.classList).toContain('right');
  });

  it('should apply class name if dividing', () => {
    fixture.componentRef.setInput('suiDividing', true);
    fixture.detectChanges();
    expect(railElement.classList).toContain('dividing');
  });

  it('should apply class name if attached', () => {
    fixture.componentRef.setInput('suiAttached', true);
    fixture.detectChanges();
    expect(railElement.classList).toContain('attached');
  });

  it('should apply class name if internal', () => {
    fixture.componentRef.setInput('suiInternal', true);
    fixture.detectChanges();
    expect(railElement.classList).toContain('internal');
  });
});

@Component({
  standalone: true,
  imports: [SuiRailDirective],
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
  @Input() suiLocation: any = null;
  @Input() suiSize: any = null;
  @Input() suiCloseness: any = null;
  @Input() suiInternal = false;
  @Input() suiDividing = false;
  @Input() suiAttached = false;
}
