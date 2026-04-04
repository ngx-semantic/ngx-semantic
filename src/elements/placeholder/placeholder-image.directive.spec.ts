import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiPlaceholderModule} from './placeholder.module';
import {SuiPlaceholderImageDirective} from './placeholder-image.directive';

describe('SuiPlaceholderImageDirective', () => {
  let fixture: ComponentFixture<TestPlaceholderImageHostComponent>;
  let imageElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SuiPlaceholderModule],
      declarations: [TestPlaceholderImageHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPlaceholderImageHostComponent);
    fixture.detectChanges();
    imageElement = fixture.debugElement.query(By.directive(SuiPlaceholderImageDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply image class', () => {
    expect(imageElement.className).toContain('image');
  });

  it('should apply square class when suiSquare is true', () => {
    fixture.componentRef.setInput('suiSquare', true);
    fixture.detectChanges();
    expect(imageElement.className).toContain('square');
  });

  it('should apply rectangular class when suiRectangular is true', () => {
    fixture.componentRef.setInput('suiRectangular', true);
    fixture.detectChanges();
    expect(imageElement.className).toContain('rectangular');
  });
});

@Component({
  standalone: false,
  template: `
    <div
      suiPlaceholderImage
      [suiSquare]="suiSquare"
      [suiRectangular]="suiRectangular">
    </div>
  `
})
class TestPlaceholderImageHostComponent {
  @Input() suiSquare = false;
  @Input() suiRectangular = false;
}
