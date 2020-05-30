/**
 * Created by bolor on 4/26/2020
 */

import {Component, Input} from '@angular/core';
import {SuiImageComponent} from './image.component';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

describe('SuiImageComponent', () => {
  let component: TestImageComponent;
  let fixture: ComponentFixture<TestImageComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestImageComponent, SuiImageComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.directive(SuiImageComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(buttonElement.className).toContain('ui');
    expect(buttonElement.className).toContain('image');
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

  it('should apply class name by state', () => {
    component.suiDisabled = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('disabled');
    component.suiHidden = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('hidden');
  });

  it('should apply class name by other factors', () => {
    component.suiFluid = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('fluid');
    component.suiCircular = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('circular');
    component.suiRounded = true;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('rounded');
  });

  it('should apply class name by alignment', () => {
    component.suiAlignment = 'left aligned';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('left');
    expect(buttonElement.classList).toContain('aligned');
    component.suiAlignment = 'right aligned';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('right');
    expect(buttonElement.classList).toContain('aligned');
    component.suiAlignment = 'middle aligned';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('middle');
    expect(buttonElement.classList).toContain('aligned');
  });
});

@Component({
  template: `
    <div
      sui-image
      [suiSize]="suiSize"
      [suiDisabled]="suiDisabled"
      [suiFluid]="suiFluid"
      [suiRounded]="suiRounded"
      [suiHidden]="suiHidden"
      [suiAlignment]="suiAlignment"
      [suiCircular]="suiCircular">
      Button
    </div>
  `
})
export class TestImageComponent {
  @Input() suiSize: any = null;
  @Input() suiAlignment: any = null;
  @Input() suiHidden = false;
  @Input() suiDisabled = false;
  @Input() suiAvatar = false;
  @Input() suiBordered = false;
  @Input() suiFluid = false;
  @Input() suiRounded = false;
  @Input() suiCircular = false;
  @Input() suiCentered = false;
  @Input() suiSpaced = false;
  @Input() suiFloated = false;
}
