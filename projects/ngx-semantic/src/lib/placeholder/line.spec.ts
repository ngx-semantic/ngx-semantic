/**
 * Created by bolor on 5/6/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {SuiPlaceholderLineComponent} from './line.component';

describe('SuiPlaceholderLineComponent', () => {
  let component: TestPlaceholderLineComponent;
  let fixture: ComponentFixture<TestPlaceholderLineComponent>;
  let lineElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestPlaceholderLineComponent, SuiPlaceholderLineComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lineElement = fixture.debugElement.query(By.directive(SuiPlaceholderLineComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(lineElement.className).toBe('line');
  });

  it('should apply class name by length', () => {
    component.suiLength = 'medium';
    fixture.detectChanges();
    expect(lineElement.className).toContain('medium');
    component.suiLength = 'full';
    fixture.detectChanges();
    expect(lineElement.className).toContain('full');
    component.suiLength = 'very long';
    fixture.detectChanges();
    expect(lineElement.className).toContain('very');
    expect(lineElement.className).toContain('long');
  });
});

@Component({
  template: `
    <div
      sui-placeholder-line
      [suiLength]="suiLength">
    </div>
  `
})
export class TestPlaceholderLineComponent {
  @Input() suiLength = null;
}

