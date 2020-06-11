import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
  SuiButtonAnimation, SuiButtonAttachment,
  SuiButtonComponent,
  SuiButtonEmphasis,
  SuiButtonFloating,
  SuiButtonLabeling,
  SuiSocialButtonStyle
} from './button.component';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {SuiColour, SuiSize} from '../common';

describe('SuiButtonComponent', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestButtonComponent, SuiButtonComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.directive(SuiButtonComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(buttonElement.className).toContain('ui');
    expect(buttonElement.className).toContain('button');
  });

  it('should apply class name by emphasis', () => {
    component.suiEmphasis = 'primary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('primary');
    component.suiEmphasis = 'secondary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('secondary');
    component.suiEmphasis = 'positive';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('positive');
    component.suiEmphasis = 'negative';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('negative');
  });

  it('should apply class name by size', () => {
    component.suiSize = 'mini';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('mini');
    component.suiSize = 'tiny';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('tiny');
    component.suiSize = 'small';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('small');
    component.suiSize = 'medium';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('medium');
    component.suiSize = 'large';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('large');
    component.suiSize = 'big';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('big');
    component.suiSize = 'huge';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('huge');
    component.suiSize = 'massive';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('massive');
  });

  it('should apply class name by labeling', () => {
    component.suiLabeled = 'left labeled';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    expect(buttonElement.classList).toContain('labeled');
    component.suiLabeled = 'right labeled';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
    expect(buttonElement.classList).toContain('labeled');
    component.suiLabeled = 'labeled';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('labeled');
  });

  it('should apply class name by attachment', () => {
    component.suiAttached = 'left attached';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    expect(buttonElement.classList).toContain('attached');
    component.suiAttached = 'right attached';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
    expect(buttonElement.classList).toContain('attached');
    component.suiAttached = 'top attached';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('top');
    expect(buttonElement.classList).toContain('attached');
    component.suiAttached = 'bottom attached';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('bottom');
    expect(buttonElement.classList).toContain('attached');
  });

  it('should apply class name by state', () => {
    component.suiActive = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('active');
    component.suiDisabled = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('disabled');
    component.suiLoading = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('loading');
  });

  it('should apply class name by other factors', () => {
    component.suiIcon = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('icon');
    component.suiCompact = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('compact');
    component.suiFluid = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('fluid');
    component.suiToggle = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('toggle');
    component.suiCircular = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('circular');
  });

  it('should apply class name by social style', () => {
    component.suiSocial = 'facebook';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('facebook');
    component.suiSocial = 'twitter';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('twitter');
    component.suiSocial = 'google';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('google');
    component.suiSocial = 'vk';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('vk');
    component.suiSocial = 'linkedin';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('linkedin');
    component.suiSocial = 'instagram';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('instagram');
    component.suiSocial = 'youtube';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('youtube');
  });

  it('should apply class name by colour', () => {
    component.suiColour = 'red';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('red');
    component.suiColour = 'orange';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('orange');
    component.suiColour = 'yellow';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('yellow');
    component.suiColour = 'olive';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('olive');
    component.suiColour = 'green';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('green');
    component.suiColour = 'teal';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('teal');
    component.suiColour = 'blue';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('blue');
    component.suiColour = 'pink';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('pink');
    component.suiColour = 'brown';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('brown');
    component.suiColour = 'grey';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('grey');
    component.suiColour = 'black';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('black');
  });
});

@Component({
  template: `
    <button
      sui-button
      [suiSize]="suiSize"
      [suiEmphasis]="suiEmphasis"
      [suiSocial]="suiSocial"
      [suiColour]="suiColour"
      [suiIcon]="suiIcon"
      [suiBasic]="suiBasic"
      [suiInverted]="suiInverted"
      [suiAnimated]="suiAnimated"
      [suiLabeled]="suiLabeled"
      [suiActive]="suiActive"
      [suiDisabled]="suiDisabled"
      [suiLoading]="suiLoading"
      [suiCompact]="suiCompact"
      [suiToggle]="suiToggle"
      [suiFluid]="suiFluid"
      [suiCircular]="suiCircular"
      [suiAttached]="suiAttached">
      Button
    </button>
  `
})
export class TestButtonComponent {
  @Input() suiEmphasis: SuiButtonEmphasis = null;
  @Input() suiAnimated: SuiButtonAnimation = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiLabeled: SuiButtonLabeling = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiSocial: SuiSocialButtonStyle = null;
  @Input() suiFloated: SuiButtonFloating = null;
  @Input() suiAttached: SuiButtonAttachment = null;
  @Input() suiIcon = false;
  @Input() suiBasic = false;
  @Input() suiInverted = false;
  @Input() suiCompact = false;
  @Input() suiToggle = false;
  @Input() suiFluid = false;
  @Input() suiCircular = false;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiLoading = false;
}
