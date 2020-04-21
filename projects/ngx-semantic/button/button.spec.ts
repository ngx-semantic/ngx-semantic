import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiButtonComponent} from './button.component';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

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
    expect(buttonElement.className).toBe('ui button');
  });

  it('should apply class name by style', () => {
    component.suiStyle = 'primary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('primary');
    component.suiStyle = 'secondary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('secondary');
    component.suiStyle = 'positive';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('positive');
    component.suiStyle = 'negative';
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

  it('should apply class name by direction', () => {
    component.suiDirection = 'left';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    component.suiDirection = 'right';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
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
});

@Component({
  template: `
    <button
      sui-button
      [suiSize]="suiSize"
      [suiStyle]="suiStyle"
      [suiDirection]="suiDirection"
      [suiSocial]="suiSocial"
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
      [suiFluid]="suiFluid">
      Button
    </button>
  `
})
export class TestButtonComponent {
  @Input() suiStyle: any = null;
  @Input() suiSize: any = null;
  @Input() suiDirection: any = null;
  @Input() suiSocial: any = null;
  @Input() suiIcon = false;
  @Input() suiBasic = false;
  @Input() suiInverted = false;
  @Input() suiAnimated = false;
  @Input() suiLabeled = false;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiLoading = false;
  @Input() suiCompact = false;
  @Input() suiToggle = false;
  @Input() suiFluid = false;
}
