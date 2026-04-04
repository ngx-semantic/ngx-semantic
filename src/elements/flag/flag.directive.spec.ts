import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiFlagDirective} from './flag.directive';

describe('SuiFlagDirective', () => {
  let fixture: ComponentFixture<TestFlagComponent>;
  let flagElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFlagComponent, SuiFlagDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFlagComponent);
    fixture.detectChanges();
    flagElement = fixture.debugElement.query(By.directive(SuiFlagDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply country and flag classes', () => {
    expect(flagElement.classList).toContain('myanmar');
    expect(flagElement.classList).toContain('flag');
  });
});

@Component({
  standalone: true,
  imports: [SuiFlagDirective],
  template: `
    <i sui-flag [suiCountry]="'myanmar'"></i>
  `
})
class TestFlagComponent {
}
