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
    component.suiIcon = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('icon');
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
});

@Component({
  template: `
    <button
      sui-button
      [suiSize]="suiSize"
      [suiStyle]="suiStyle"
      [suiDirection]="suiDirection"
      [suiIcon]="suiIcon"
      [suiBasic]="suiBasic"
      [suiInverted]="suiInverted"
      [suiAnimated]="suiAnimated"
      [suiLabeled]="suiLabeled"
      [suiActive]="suiActive"
      [suiDisabled]="suiDisabled"
      [suiLoading]="suiLoading">
      Button
    </button>
  `
})
export class TestButtonComponent {
  @Input() suiStyle: any = null;
  @Input() suiSize: any = null;
  @Input() suiDirection: any = null;
  @Input() suiIcon = false;
  @Input() suiBasic = false;
  @Input() suiInverted = false;
  @Input() suiAnimated = false;
  @Input() suiLabeled = false;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiLoading = false;
}
