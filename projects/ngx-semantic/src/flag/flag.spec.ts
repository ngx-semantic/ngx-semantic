import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SuiFlagComponent} from './flag.component';
import {By} from '@angular/platform-browser';

describe('FlagComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(flagElement.className).toBe('myanmar flag');
  });
});

@Component({
  template: `
    <i class="myanmar"
       sui-flag>
    </i>
  `
})
export class TestFlagComponent {
}
