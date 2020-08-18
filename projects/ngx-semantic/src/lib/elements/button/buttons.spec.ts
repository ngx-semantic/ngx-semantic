/**
 * Created by bolor on 4/20/2020
 */

import {Component, Input} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {SuiButtonComponent} from './button.component';
import {By} from '@angular/platform-browser';
import {SuiButtonsComponent} from './buttons.component';

describe('SuiButtonsComponent', () => {
  let component: TestButtonGroupComponent;
  let fixture: ComponentFixture<TestButtonGroupComponent>;
  let groupElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestButtonGroupComponent, SuiButtonsComponent, SuiButtonComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    groupElement = fixture.debugElement.query(By.directive(SuiButtonsComponent)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(groupElement.className).toContain('ui');
    expect(groupElement.className).toContain('buttons');
  });

  it('should apply class name by icon type', () => {
    component.suiIcon = 'icon';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('icon');
    component.suiIcon = 'labeled icon';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('icon');
    expect(groupElement.classList).toContain('labeled');
  });

  it('should apply class name by direction', () => {
    component.suiVertical = true;
    fixture.detectChanges();
    expect(groupElement.classList).toContain('vertical');
  });

  it('should apply class name by attachment', () => {
    component.suiAttached = 'top attached';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('top');
    expect(groupElement.classList).toContain('attached');
    component.suiAttached = 'bottom attached';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('bottom');
    expect(groupElement.classList).toContain('attached');
  });

  it('should apply class name by colour', () => {
    component.suiColour = 'red';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('red');
    component.suiColour = 'orange';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('orange');
    component.suiColour = 'yellow';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('yellow');
    component.suiColour = 'olive';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('olive');
    component.suiColour = 'green';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('green');
    component.suiColour = 'teal';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('teal');
    component.suiColour = 'blue';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('blue');
    component.suiColour = 'pink';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('pink');
    component.suiColour = 'brown';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('brown');
    component.suiColour = 'grey';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('grey');
    component.suiColour = 'black';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('black');
  });

  it('should apply class name by size', () => {
    component.suiSize = 'mini';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('mini');
    component.suiSize = 'tiny';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('tiny');
    component.suiSize = 'small';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('small');
    component.suiSize = 'medium';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('medium');
    component.suiSize = 'large';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('large');
    component.suiSize = 'big';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('big');
    component.suiSize = 'huge';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('huge');
    component.suiSize = 'massive';
    fixture.detectChanges();
    expect(groupElement.classList).toContain('massive');
  });
});

@Component({
  template: `
    <div
      sui-buttons
      [suiIcon]="suiIcon"
      [suiColour]="suiColour"
      [suiSize]="suiSize"
      [suiBasic]="suiBasic"
      [suiVertical]="suiVertical"
      [suiAttached]="suiAttached">
      <button sui-button></button>
      <button sui-button></button>
    </div>
  `
})
export class TestButtonGroupComponent {
  @Input() suiSize: any = null;
  @Input() suiColour: any = null;
  @Input() suiAttached: any = null;
  @Input() suiIcon: any = null;
  @Input() suiBasic = false;
  @Input() suiVertical = false;
}
