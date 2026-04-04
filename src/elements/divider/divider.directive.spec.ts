import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiDividerDirective, SuiDividerDirection} from './divider.directive';
import {By} from '@angular/platform-browser';

describe('SuiDividerComponent', () => {
  let component: TestDividerComponent;
  let fixture: ComponentFixture<TestDividerComponent>;
  let dividerElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CommonModule, TestDividerComponent, SuiDividerDirective],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dividerElement = fixture.debugElement.query(By.directive(SuiDividerDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(dividerElement.className).toContain('ui');
    expect(dividerElement.className).toContain('divider');
  });

  it('should apply class name by direction', () => {
    fixture.componentRef.setInput('suiDirection', 'vertical');
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('vertical');
    fixture.componentRef.setInput('suiDirection', 'horizontal');
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('horizontal');
  });

  it('should apply class name if header', () => {
    fixture.componentRef.setInput('suiHeader', true);
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('header');
  });

  it('should apply class name if fitted', () => {
    fixture.componentRef.setInput('suiFitted', true);
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('fitted');
  });

  it('should apply class name if hidden', () => {
    fixture.componentRef.setInput('suiHidden', true);
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('hidden');
  });

  it('should apply class name if section', () => {
    fixture.componentRef.setInput('suiSection', true);
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('section');
  });

  it('should apply class name if inverted', () => {
    fixture.componentRef.setInput('suiInverted', true);
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('inverted');
  });
});

@Component({
  standalone: true,
  imports: [SuiDividerDirective],
  template: `
    <div
      sui-divider
      [suiHeader]="suiHeader"
      [suiFitted]="suiFitted"
      [suiHidden]="suiHidden"
      [suiSection]="suiSection"
      [suiInverted]="suiInverted"
      [suiDirection]="suiDirection">
    </div>
  `
})
export class TestDividerComponent {
  @Input() suiDirection: SuiDividerDirection = null;
  @Input() suiHeader = false;
  @Input() suiInverted = false;
  @Input() suiFitted = false;
  @Input() suiHidden = false;
  @Input() suiSection = false;
  @Input() suiClearing = false;
}
