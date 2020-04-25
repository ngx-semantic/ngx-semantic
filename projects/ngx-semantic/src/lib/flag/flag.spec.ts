import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SuiFlagComponent} from './flag.component';
import {By} from '@angular/platform-browser';

describe('SuiFlagComponent', () => {
  let component: TestFlagComponent;
  let fixture: ComponentFixture<TestFlagComponent>;
  let flagElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TestFlagComponent, SuiFlagComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flagElement = fixture.debugElement.query(By.directive(SuiFlagComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(flagElement.className).toBe('flag myanmar');
  });
});

@Component({
  template: `
    <i
      sui-flag
      suiCountry="myanmar">
    </i>
  `
})
export class TestFlagComponent {
}
