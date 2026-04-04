import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiHeaderAlignment, SuiHeaderAttachment, SuiHeaderDirective, SuiHeaderFloating} from './header.directive';
import {By} from '@angular/platform-browser';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';

describe('SuiHeaderComponent', () => {
  let component: TestHeaderComponent;
  let fixture: ComponentFixture<TestHeaderComponent>;
  let headerElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TestHeaderComponent, SuiHeaderDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    headerElement = fixture.debugElement.query(By.directive(SuiHeaderDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(headerElement.className).toContain('ui');
    expect(headerElement.className).toContain('header');
  });

  it('should apply class name if icon', () => {
    fixture.componentRef.setInput('suiIcon', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('icon');
  });

  it('should apply class name if sub header', () => {
    fixture.componentRef.setInput('suiSubHeader', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('sub');
  });

  it('should apply class name if disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('disabled');
  });

  it('should apply class name if dividing', () => {
    fixture.componentRef.setInput('suiDividing', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('dividing');
  });

  it('should apply class name if block', () => {
    fixture.componentRef.setInput('suiBlock', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('block');
  });

  it('should apply class name if floated', () => {
    fixture.componentRef.setInput('suiFloated', 'left floated');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('left');
    expect(headerElement.classList).toContain('floated');
    fixture.componentRef.setInput('suiFloated', 'right floated');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('right');
    expect(headerElement.classList).toContain('floated');
  });

  it('should apply class name if attached', () => {
    fixture.componentRef.setInput('suiAttached', 'top attached');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('attached');
    expect(headerElement.classList).toContain('top');
    fixture.componentRef.setInput('suiAttached', 'bottom attached');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('attached');
    expect(headerElement.classList).toContain('bottom');
  });

  it('should apply class name if inverted', () => {
    fixture.componentRef.setInput('suiInverted', true);
    fixture.detectChanges();
    expect(headerElement.classList).toContain('inverted');
  });

  it('should apply class name by alignment', () => {
    fixture.componentRef.setInput('suiAlignment', 'center aligned');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('center');
    expect(headerElement.classList).toContain('aligned');
    fixture.componentRef.setInput('suiAlignment', 'left aligned');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('left');
    expect(headerElement.classList).toContain('aligned');
    fixture.componentRef.setInput('suiAlignment', 'right aligned');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('right');
    expect(headerElement.classList).toContain('aligned');
    fixture.componentRef.setInput('suiAlignment', 'justified');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('justified');
    expect(headerElement.classList).not.toContain('aligned');
  });

  it('should apply class name by colour', () => {
    fixture.componentRef.setInput('suiColour', 'red');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('red');
    fixture.componentRef.setInput('suiColour', 'orange');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('orange');
    fixture.componentRef.setInput('suiColour', 'yellow');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('yellow');
    fixture.componentRef.setInput('suiColour', 'olive');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('olive');
    fixture.componentRef.setInput('suiColour', 'green');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('green');
    fixture.componentRef.setInput('suiColour', 'teal');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('teal');
    fixture.componentRef.setInput('suiColour', 'blue');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('blue');
    fixture.componentRef.setInput('suiColour', 'pink');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('pink');
    fixture.componentRef.setInput('suiColour', 'brown');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('brown');
    fixture.componentRef.setInput('suiColour', 'grey');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('grey');
    fixture.componentRef.setInput('suiColour', 'black');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('black');
  });

  it('should apply class name by size', () => {
    fixture.componentRef.setInput('suiSize', 'mini');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('mini');
    fixture.componentRef.setInput('suiSize', 'tiny');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('tiny');
    fixture.componentRef.setInput('suiSize', 'small');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('small');
    fixture.componentRef.setInput('suiSize', 'medium');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('medium');
    fixture.componentRef.setInput('suiSize', 'large');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('large');
    fixture.componentRef.setInput('suiSize', 'big');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('big');
    fixture.componentRef.setInput('suiSize', 'huge');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('huge');
    fixture.componentRef.setInput('suiSize', 'massive');
    fixture.detectChanges();
    expect(headerElement.classList).toContain('massive');
  });
});

@Component({
  standalone: true,
  imports: [SuiHeaderDirective],
  template: `
    <div
      sui-header
      [suiSize]="suiSize"
      [suiAlignment]="suiAlignment"
      [suiColour]="suiColour"
      [suiIcon]="suiIcon"
      [suiSubHeader]="suiSubHeader"
      [disabled]="disabled"
      [suiDividing]="suiDividing"
      [suiBlock]="suiBlock"
      [suiAttached]="suiAttached"
      [suiFloated]="suiFloated"
      [suiInverted]="suiInverted">
    </div>
  `
})
export class TestHeaderComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAlignment: SuiHeaderAlignment = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiFloated: SuiHeaderFloating = null;
  @Input() suiAttached: SuiHeaderAttachment = null;
  @Input() suiIcon = false;
  @Input() suiSubHeader = false;
  @Input() disabled = false;
  @Input() suiDividing = false;
  @Input() suiBlock = false;
  @Input() suiInverted = false;
}
