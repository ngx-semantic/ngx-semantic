/**
 * Created by bolor on 4/20/2020
 */

import {Component, Input} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {SuiButtonComponent} from './button.component';
import {By} from '@angular/platform-browser';
import {SuiButtonGroupComponent} from './button-group.component';

describe('SuiButtonGroupComponent', () => {
  let component: TestButtonGroupComponent;
  let fixture: ComponentFixture<TestButtonGroupComponent>;
  let groupElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestButtonGroupComponent, SuiButtonGroupComponent, SuiButtonComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    groupElement = fixture.debugElement.query(By.directive(SuiButtonGroupComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(groupElement.className).toBe('ui buttons');
  });

  it('should apply class name by state', () => {
    component.suiIcon = true;
    fixture.detectChanges();
    expect(groupElement.classList).toContain('icon');
  });
});

@Component({
  template: `
    <div
      sui-button-group
      [suiIcon]="suiIcon">
      <button sui-button></button>
      <button sui-button></button>
    </div>
  `
})
export class TestButtonGroupComponent {
  @Input() suiIcon = false;
}
