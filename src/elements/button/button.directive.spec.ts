import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {
  SuiButtonAnimation, SuiButtonAttachment,
  SuiButtonDirective,
  SuiButtonEmphasis,
  SuiButtonFloating,
  SuiButtonLabeling,
  SuiSocialButtonStyle
} from './button.directive';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';

describe('SuiButtonComponent', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CommonModule, TestButtonComponent, SuiButtonDirective],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.directive(SuiButtonDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(buttonElement.className).toContain('ui');
    expect(buttonElement.className).toContain('button');
  });

  it('should apply class name by emphasis', () => {
    fixture.componentRef.setInput('suiEmphasis', 'primary');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('primary');
    fixture.componentRef.setInput('suiEmphasis', 'secondary');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('secondary');
    fixture.componentRef.setInput('suiEmphasis', 'positive');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('positive');
    fixture.componentRef.setInput('suiEmphasis', 'negative');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('negative');
  });

  it('should apply class name by size', () => {
    fixture.componentRef.setInput('suiSize', 'mini');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('mini');
    fixture.componentRef.setInput('suiSize', 'tiny');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('tiny');
    fixture.componentRef.setInput('suiSize', 'small');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('small');
    fixture.componentRef.setInput('suiSize', 'medium');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('medium');
    fixture.componentRef.setInput('suiSize', 'large');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('large');
    fixture.componentRef.setInput('suiSize', 'big');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('big');
    fixture.componentRef.setInput('suiSize', 'huge');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('huge');
    fixture.componentRef.setInput('suiSize', 'massive');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('massive');
  });

  it('should apply class name by labeling', () => {
    fixture.componentRef.setInput('suiLabeled', 'left labeled');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    expect(buttonElement.classList).toContain('labeled');
    fixture.componentRef.setInput('suiLabeled', 'right labeled');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
    expect(buttonElement.classList).toContain('labeled');
    fixture.componentRef.setInput('suiLabeled', 'labeled');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('labeled');
  });

  it('should apply class name by attachment', () => {
    fixture.componentRef.setInput('suiAttachedPosition', 'left');
    fixture.componentRef.setInput('suiAttached', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    expect(buttonElement.classList).toContain('attached');
    fixture.componentRef.setInput('suiAttachedPosition', 'right');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
    expect(buttonElement.classList).toContain('attached');
    fixture.componentRef.setInput('suiAttachedPosition', 'top');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('top');
    expect(buttonElement.classList).toContain('attached');
    fixture.componentRef.setInput('suiAttachedPosition', 'bottom');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('bottom');
    expect(buttonElement.classList).toContain('attached');
  });

  it('should apply class name by state', () => {
    fixture.componentRef.setInput('suiActive', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('active');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('disabled');
    fixture.componentRef.setInput('suiLoading', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('loading');
  });

  it('should apply class name by other factors', () => {
    fixture.componentRef.setInput('suiIcon', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('icon');
    fixture.componentRef.setInput('suiCompact', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('compact');
    fixture.componentRef.setInput('suiFluid', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('fluid');
    fixture.componentRef.setInput('suiToggle', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('toggle');
    fixture.componentRef.setInput('suiCircular', true);
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('circular');
  });

  it('should apply class name by social style', () => {
    fixture.componentRef.setInput('suiSocial', 'facebook');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('facebook');
    fixture.componentRef.setInput('suiSocial', 'twitter');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('twitter');
    fixture.componentRef.setInput('suiSocial', 'google');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('google');
    fixture.componentRef.setInput('suiSocial', 'vk');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('vk');
    fixture.componentRef.setInput('suiSocial', 'linkedin');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('linkedin');
    fixture.componentRef.setInput('suiSocial', 'instagram');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('instagram');
    fixture.componentRef.setInput('suiSocial', 'youtube');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('youtube');
  });

  it('should apply class name by colour', () => {
    fixture.componentRef.setInput('suiColour', 'red');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('red');
    fixture.componentRef.setInput('suiColour', 'orange');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('orange');
    fixture.componentRef.setInput('suiColour', 'yellow');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('yellow');
    fixture.componentRef.setInput('suiColour', 'olive');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('olive');
    fixture.componentRef.setInput('suiColour', 'green');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('green');
    fixture.componentRef.setInput('suiColour', 'teal');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('teal');
    fixture.componentRef.setInput('suiColour', 'blue');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('blue');
    fixture.componentRef.setInput('suiColour', 'pink');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('pink');
    fixture.componentRef.setInput('suiColour', 'brown');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('brown');
    fixture.componentRef.setInput('suiColour', 'grey');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('grey');
    fixture.componentRef.setInput('suiColour', 'black');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('black');
  });
});

@Component({
  standalone: true,
  imports: [SuiButtonDirective],
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
        [disabled]="disabled"
        [suiLoading]="suiLoading"
        [suiCompact]="suiCompact"
        [suiToggle]="suiToggle"
        [suiFluid]="suiFluid"
        [suiCircular]="suiCircular"
        [suiAttached]="suiAttached"
        [suiAttachedPosition]="suiAttachedPosition">
      Button
    </button>
  `
})
export class TestButtonComponent {
  @Input() public suiEmphasis: SuiButtonEmphasis = null;
  @Input() public suiAnimated: SuiButtonAnimation = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiLabeled: SuiButtonLabeling = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiSocial: SuiSocialButtonStyle = null;
  @Input() public suiFloated: SuiButtonFloating = null;
  @Input() public suiAttachedPosition: SuiButtonAttachment = null;
  @Input() public suiIcon = false;
  @Input() public suiBasic = false;
  @Input() public suiInverted = false;
  @Input() public suiCompact = false;
  @Input() public suiToggle = false;
  @Input() public suiFluid = false;
  @Input() public suiCircular = false;
  @Input() public suiActive = false;
  @Input() public disabled = false;
  @Input() public suiLoading = false;
  @Input() public suiAttached = false;
}
