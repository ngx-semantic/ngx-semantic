/**
 * Created by bolor on 4/26/2020
 */

import {Component, Input} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {SuiImagesDirective} from './images.directive';
import {By} from '@angular/platform-browser';
import {SuiImageDirective} from './image.directive';

describe('SuiImageGroupComponent', () => {
  let component: TestImageGroupComponent;
  let fixture: ComponentFixture<TestImageGroupComponent>;
  let groupElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestImageGroupComponent, SuiImagesDirective, SuiImageDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    groupElement = fixture.debugElement.query(By.directive(SuiImagesDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(groupElement.classList).toContain('ui');
    expect(groupElement.classList).toContain('images');
  });

  it('should apply class name by size', () => {
    component.suiSize = 'mini';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('mini');
    component.suiSize = 'tiny';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('tiny');
    component.suiSize = 'small';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('small');
    component.suiSize = 'medium';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('medium');
    component.suiSize = 'large';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('large');
    component.suiSize = 'big';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('big');
    component.suiSize = 'huge';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('huge');
    component.suiSize = 'massive';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('massive');
  });
});

@Component({
  template: `
    <div
      sui-images
      [suiSize]="suiSize">
      <div sui-image></div>
      <div sui-image></div>
    </div>
  `
})
export class TestImageGroupComponent {
  @Input() suiSize: any = null;
}
