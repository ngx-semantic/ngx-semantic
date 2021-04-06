/**
 * Created by bolor on 5/6/2020
 */

import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiPlaceholderImageDirective} from './placeholder-image.directive';

describe('SuiPlaceholderImageComponent', () => {
  let component: TestPlaceholderImageComponent;
  let fixture: ComponentFixture<TestPlaceholderImageComponent>;
  let imageElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestPlaceholderImageComponent, SuiPlaceholderImageDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imageElement = fixture.debugElement.query(By.directive(SuiPlaceholderImageDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(imageElement.className).toBe('image');
  });

  it('should apply class name if square', () => {
    component.suiSquare = true;
    fixture.detectChanges();
    expect(imageElement.className).toContain('square');
  });

  it('should apply class name if rectangular', () => {
    component.suiRectangular = true;
    fixture.detectChanges();
    expect(imageElement.className).toContain('rectangular');
  });
});

@Component({
  template: `
    <div
      suiPlaceholderImage
      [suiRectangular]="suiRectangular"
      [suiSquare]="suiSquare">
    </div>
  `
})
export class TestPlaceholderImageComponent {
  @Input() public suiSquare = false;
  @Input() public suiRectangular = false;
}

