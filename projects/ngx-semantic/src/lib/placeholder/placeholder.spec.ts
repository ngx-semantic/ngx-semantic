/**
 * Created by bolor on 5/6/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';

describe('SuiPlaceholderComponent', () => {
  let component: TestPlaceholderComponent;
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let placeholderElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestPlaceholderComponent, SuiPlaceholderComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    placeholderElement = fixture.debugElement.query(By.directive(SuiPlaceholderComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(placeholderElement.classList).toContain('ui');
    expect(placeholderElement.classList).toContain('placeholder');
  });

  it('should apply class name by fluid', () => {
    component.suiFluid = true;
    fixture.detectChanges();
    expect(placeholderElement.classList).toContain('fluid');
  });

  it('should apply class name by activity', () => {
    component.suiActive = true;
    fixture.detectChanges();
    expect(placeholderElement.classList).toContain('active');
  });

  it('should apply class name by inversion', () => {
    component.suiInverted = true;
    fixture.detectChanges();
    expect(placeholderElement.classList).toContain('inverted');
  });
});

@Component({
  template: `
    <div
      sui-placeholder
      [suiActive]="suiActive"
      [suiFluid]="suiFluid"
      [suiInverted]="suiInverted">
    </div>
  `
})
export class TestPlaceholderComponent {
  @Input() suiActive = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;
}

