/**
 * Created by bolor on 5/6/2020
 */

import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiPlaceholderLineDirective} from './placeholder-line.directive';

describe('SuiPlaceholderLineComponent', () => {
  let component: TestPlaceholderLineComponent;
  let fixture: ComponentFixture<TestPlaceholderLineComponent>;
  let lineElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestPlaceholderLineComponent, SuiPlaceholderLineDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lineElement = fixture.debugElement.query(By.directive(SuiPlaceholderLineDirective)).nativeElement;
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
      suiPlaceholderLine
      [suiLength]="suiLength">
    </div>
  `
})
export class TestPlaceholderLineComponent {
  @Input() public suiLength = null;
}

