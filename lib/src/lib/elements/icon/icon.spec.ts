import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SuiIconDirective} from './icon.component';
import {By} from '@angular/platform-browser';

describe('SuiIconComponent', () => {
  let component: TestIconComponent;
  let fixture: ComponentFixture<TestIconComponent>;
  let iconElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TestIconComponent, SuiIconDirective]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    iconElement = fixture.debugElement.query(By.directive(SuiIconDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(iconElement.className).toBe('braille icon');
  });
});

@Component({
  template: `
    <i
      sui-icon
      suiIconType="braille">
    </i>
  `
})
export class TestIconComponent {
}

