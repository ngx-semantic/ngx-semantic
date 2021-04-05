import {ComponentFixture, TestBed, fakefakeAsync} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiHeaderAlignment, SuiHeaderAttachment, SuiHeaderDirective, SuiHeaderFloating} from './header.directive';
import {By} from '@angular/platform-browser';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {SuiHeaderModule} from 'ngx-semantic/elements/header/header.module';

describe('SuiHeaderComponent', () => {
  let component: TestHeaderComponent;
  let fixture: ComponentFixture<TestHeaderComponent>;
  let headerElement: HTMLDivElement;

  beforeEach(fakefakeAsync(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule, SuiHeaderModule],
        declarations: [TestHeaderComponent, SuiHeaderDirective]
      })
      .compileComponents();
  }));

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
    component.suiIcon = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('icon');
  });

  it('should apply class name if sub header', () => {
    component.suiSubHeader = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('sub');
  });

  it('should apply class name if disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('disabled');
  });

  it('should apply class name if dividing', () => {
    component.suiDividing = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('dividing');
  });

  it('should apply class name if block', () => {
    component.suiBlock = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('block');
  });

  it('should apply class name if floated', () => {
    component.suiFloated = 'left floated';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('left');
    expect(headerElement.classList).toContain('floated');
    component.suiFloated = 'right floated';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('right');
    expect(headerElement.classList).toContain('floated');
  });

  it('should apply class name if attached', () => {
    component.suiAttached = 'top attached';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('attached');
    expect(headerElement.classList).toContain('top');
    component.suiAttached = 'bottom attached';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('attached');
    expect(headerElement.classList).toContain('bottom');
  });

  it('should apply class name if inverted', () => {
    component.suiInverted = true;
    fixture.detectChanges();
    expect(headerElement.classList).toContain('inverted');
  });

  it('should apply class name by alignment', () => {
    component.suiAlignment = 'center aligned';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('center');
    expect(headerElement.classList).toContain('aligned');
    component.suiAlignment = 'left aligned';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('left');
    expect(headerElement.classList).toContain('aligned');
    component.suiAlignment = 'right aligned';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('right');
    expect(headerElement.classList).toContain('aligned');
    component.suiAlignment = 'justified';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('justified');
    expect(headerElement.classList).not.toContain('aligned');
  });

  it('should apply class name by colour', () => {
    component.suiColour = 'red';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('red');
    component.suiColour = 'orange';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('orange');
    component.suiColour = 'yellow';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('yellow');
    component.suiColour = 'olive';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('olive');
    component.suiColour = 'green';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('green');
    component.suiColour = 'teal';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('teal');
    component.suiColour = 'blue';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('blue');
    component.suiColour = 'pink';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('pink');
    component.suiColour = 'brown';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('brown');
    component.suiColour = 'grey';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('grey');
    component.suiColour = 'black';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('black');
  });

  it('should apply class name by size', () => {
    component.suiSize = 'mini';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('mini');
    component.suiSize = 'tiny';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('tiny');
    component.suiSize = 'small';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('small');
    component.suiSize = 'medium';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('medium');
    component.suiSize = 'large';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('large');
    component.suiSize = 'big';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('big');
    component.suiSize = 'huge';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('huge');
    component.suiSize = 'massive';
    fixture.detectChanges();
    expect(headerElement.classList).toContain('massive');
  });
});

@Component({
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

