/**
 * Created by bolor on 5/6/2020
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {SuiPlaceholderParagraphDirective} from './paragraph.directive';

describe('SuiPlaceholderParagraphComponent', () => {
  let component: TestPlaceholderParagraphComponent;
  let fixture: ComponentFixture<TestPlaceholderParagraphComponent>;
  let paragraphElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestPlaceholderParagraphComponent, SuiPlaceholderParagraphDirective]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    paragraphElement = fixture.debugElement.query(By.directive(SuiPlaceholderParagraphDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(paragraphElement.className).toBe('paragraph');
  });
});

@Component({
  template: `
    <div
      sui-placeholder-paragraph>
    </div>
  `
})
export class TestPlaceholderParagraphComponent {
}

