import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiButtonModule} from './button.module';
import {SuiButtonsDirective} from './buttons.directive';

describe('SuiButtonsDirective', () => {
  let fixture: ComponentFixture<TestButtonsHostComponent>;
  let groupElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SuiButtonModule],
      declarations: [TestButtonsHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestButtonsHostComponent);
    fixture.detectChanges();
    groupElement = fixture.debugElement.query(By.directive(SuiButtonsDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply ui and buttons classes', () => {
    expect(groupElement.className).toContain('ui');
    expect(groupElement.className).toContain('buttons');
  });

  it('should apply vertical class when suiVertical is true', () => {
    fixture.componentRef.setInput('suiVertical', true);
    fixture.detectChanges();
    expect(groupElement.classList).toContain('vertical');
  });
});

@Component({
  standalone: false,
  template: `
    <div
      sui-buttons
      [suiVertical]="suiVertical">
      <button sui-button type="button">A</button>
      <button sui-button type="button">B</button>
    </div>
  `
})
class TestButtonsHostComponent {
  @Input() suiVertical = false;
}
