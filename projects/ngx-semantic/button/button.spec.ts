import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiButtonComponent} from './button.component';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

describe('SuiButtonComponent', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<SuiButtonComponent>;
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

  it('should apply class name if basic type', () => {
    expect(buttonElement.classList).not.toContain('basic');
    component.suiType = 'basic';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('basic');
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
});

@Component({
  template: `
    <button
      sui-button
      [suiSize]="suiSize"
      [suiType]="suiType">
      Button
    </button>
  `
})
export class TestButtonComponent {
  @Input() suiType: any = null;
  @Input() suiSize: any = null;
}
