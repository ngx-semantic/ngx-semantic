import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiSegmentDirective, SuiSegmentAttachment, SuiSegmentPadding, SuiSegmentStacking, SuiSegmentTextAlignment } from './segment.directive';
import { By } from '@angular/platform-browser';
import { SuiColour } from 'ngx-semantic/core/enums';

describe('SuiSegmentComponent', () => {
  let component: TestSegmentComponent;
  let fixture: ComponentFixture<TestSegmentComponent>;
  let segmentElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TestSegmentComponent, SuiSegmentDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    segmentElement = fixture.debugElement.query(By.directive(SuiSegmentDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(segmentElement.className).toContain('ui');
    expect(segmentElement.className).toContain('segment');
  });

  it('should apply class name by colour', () => {
    fixture.componentRef.setInput('suiColour', 'red');
    fixture.detectChanges();
    expect(segmentElement.classList).toContain('red');
  });

  it('should apply class name by attachment', () => {
    fixture.componentRef.setInput('suiAttached', 'top attached');
    fixture.detectChanges();
    expect(segmentElement.classList).toContain('top');
    expect(segmentElement.classList).toContain('attached');
  });

  it('should apply class name if inverted', () => {
    fixture.componentRef.setInput('suiInverted', true);
    fixture.detectChanges();
    expect(segmentElement.classList).toContain('inverted');
  });

  it('should apply class name if loading', () => {
    fixture.componentRef.setInput('suiLoading', true);
    fixture.detectChanges();
    expect(segmentElement.classList).toContain('loading');
  });
});

@Component({
  standalone: true,
  imports: [SuiSegmentDirective],
  template: `
    <div
      sui-segment
      [suiColour]="suiColour"
      [suiAttached]="suiAttached"
      [suiStacked]="suiStacked"
      [suiPadding]="suiPadding"
      [suiTextAlignment]="suiTextAlignment"
      [suiInverted]="suiInverted"
      [suiLoading]="suiLoading">
    </div>
  `
})
export class TestSegmentComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiAttached: SuiSegmentAttachment = null;
  @Input() suiStacked: SuiSegmentStacking = null;
  @Input() suiPadding: SuiSegmentPadding = null;
  @Input() suiTextAlignment: SuiSegmentTextAlignment = null;
  @Input() suiInverted = false;
  @Input() suiLoading = false;
}
