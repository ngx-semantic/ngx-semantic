/**
 * Created by bolor on 5/6/2020
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiPlaceholderLineDirective } from './placeholder-line.directive';

describe('SuiPlaceholderLineComponent', () => {
  let component: TestPlaceholderLineComponent;
  let fixture: ComponentFixture<TestPlaceholderLineComponent>;
  let lineElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TestPlaceholderLineComponent, SuiPlaceholderLineDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderLineComponent);
    component = fixture.componentInstance;
    lineElement = fixture.debugElement.query(By.directive(SuiPlaceholderLineDirective)).nativeElement;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    fixture.componentRef.setInput('suiLength', null);
    fixture.detectChanges();
    expect(lineElement.className).toBe('line');
  });

  it('should apply class name by length', () => {
    fixture.componentRef.setInput('suiLength', 'medium');
    fixture.detectChanges();
    expect(lineElement.className).toContain('medium');
  });

  it('should apply class name by full length', () => {
    fixture.componentRef.setInput('suiLength', 'full');
    fixture.detectChanges();
    expect(lineElement.className).toContain('full');
  });

  it('should apply class name by very long length', () => {
    fixture.componentRef.setInput('suiLength', 'very long');
    fixture.detectChanges();
    expect(lineElement.className).toContain('very');
    expect(lineElement.className).toContain('long');
  });
});

@Component({
  standalone: true,
  imports: [SuiPlaceholderLineDirective, CommonModule],
  template: `
    <div
      suiPlaceholderLine
      [suiLength]="suiLength">
    </div>
  `
})
export class TestPlaceholderLineComponent {
  @Input() public suiLength: any = 'initial';
}

