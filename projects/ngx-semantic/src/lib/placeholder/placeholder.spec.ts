/**
 * Created by bolor on 5/6/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {SuiPlaceholderComponent} from './placeholder.component';

describe('SuiPlaceholderComponent', () => {
  let component: TestPlaceholderComponent;
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let buttonElement: HTMLDivElement;

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
    buttonElement = fixture.debugElement.query(By.directive(SuiPlaceholderComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(buttonElement.className).toBe('ui placeholder');
  });
});

@Component({
  template: `
    <div
      sui-placeholder>
    </div>
  `
})
export class TestPlaceholderComponent {
}

