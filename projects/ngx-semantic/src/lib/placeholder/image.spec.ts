/**
 * Created by bolor on 5/6/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {SuiPlaceholderImageComponent} from './image.component';

describe('SuiPlaceholderImageComponent', () => {
  let component: TestPlaceholderImageComponent;
  let fixture: ComponentFixture<TestPlaceholderImageComponent>;
  let imageElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestPlaceholderImageComponent, SuiPlaceholderImageComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imageElement = fixture.debugElement.query(By.directive(SuiPlaceholderImageComponent)).nativeElement;
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

  it('should apply class name if header', () => {
    component.suiHeader = true;
    fixture.detectChanges();
    expect(imageElement.className).toContain('header');
  });
});

@Component({
  template: `
    <div
      sui-placeholder-image
      [suiHeader]="suiHeader"
      [suiRectangular]="suiRectangular"
      [suiSquare]="suiSquare">
    </div>
  `
})
export class TestPlaceholderImageComponent {
  @Input() suiSquare = false;
  @Input() suiRectangular = false;
  @Input() suiHeader = false;
}

