import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiContainerDirective, SuiContainerAlignment } from './container.directive';
import { By } from '@angular/platform-browser';

describe('SuiContainerComponent', () => {
  let component: TestContainerComponent;
  let fixture: ComponentFixture<TestContainerComponent>;
  let containerElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TestContainerComponent, SuiContainerDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerElement = fixture.debugElement.query(By.directive(SuiContainerDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(containerElement.className).toContain('ui');
    expect(containerElement.className).toContain('container');
  });

  it('should apply class name by alignment', () => {
    fixture.componentRef.setInput('suiAlignment', 'center aligned');
    fixture.detectChanges();
    expect(containerElement.classList).toContain('center');
    expect(containerElement.classList).toContain('aligned');
  });

  it('should apply class name if text', () => {
    fixture.componentRef.setInput('suiText', true);
    fixture.detectChanges();
    expect(containerElement.classList).toContain('text');
  });

  it('should apply class name if fluid', () => {
    fixture.componentRef.setInput('suiFluid', true);
    fixture.detectChanges();
    expect(containerElement.classList).toContain('fluid');
  });
});

@Component({
  standalone: true,
  imports: [SuiContainerDirective],
  template: `
    <div
      sui-container
      [suiAlignment]="suiAlignment"
      [suiText]="suiText"
      [suiFluid]="suiFluid">
    </div>
  `
})
export class TestContainerComponent {
  @Input() suiAlignment: SuiContainerAlignment = null;
  @Input() suiText = false;
  @Input() suiFluid = false;
}
