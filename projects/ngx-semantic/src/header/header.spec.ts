import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {SuiDirection} from '../common';
import {CommonModule} from '@angular/common';
import {SuiDividerComponent} from './header.component';
import {By} from '@angular/platform-browser';
import {SuiButtonComponent} from '../button';

describe('SuiDividerComponent', () => {
  let component: TestDividerComponent;
  let fixture: ComponentFixture<TestDividerComponent>;
  let dividerElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestDividerComponent, SuiDividerComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dividerElement = fixture.debugElement.query(By.directive(SuiDividerComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(dividerElement.className).toBe('ui divider');
  });

  it('should apply class name by direction', () => {
    component.suiDirection = 'vertical';
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('vertical');
    component.suiDirection = 'horizontal';
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('horizontal');
  });

  it('should apply class name if header', () => {
    component.suiHeader = true;
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('header');
  });

  it('should apply class name if fitted', () => {
    component.suiFitted = true;
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('fitted');
  });

  it('should apply class name if hidden', () => {
    component.suiHidden = true;
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('hidden');
  });

  it('should apply class name if section', () => {
    component.suiSection = true;
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('section');
  });

  it('should apply class name if inverted', () => {
    component.suiInverted = true;
    fixture.detectChanges();
    expect(dividerElement.classList).toContain('inverted');
  });
});

@Component({
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
  @Input() suiDirection: SuiDirection = null;
  @Input() suiHeader = false;
  @Input() suiInverted = false;
  @Input() suiFitted = false;
  @Input() suiHidden = false;
  @Input() suiSection = false;
  @Input() suiClearing = false;
}

