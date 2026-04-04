import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiLoaderDirective, SuiLoaderInlineAlignment} from './loader.directive';
import {By} from '@angular/platform-browser';
import {SuiSize} from 'ngx-semantic/core/enums';

describe('SuiLoaderComponent', () => {
  let component: TestLoaderComponent;
  let fixture: ComponentFixture<TestLoaderComponent>;
  let loaderElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TestLoaderComponent, SuiLoaderDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loaderElement = fixture.debugElement.query(By.directive(SuiLoaderDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(loaderElement.className).toContain('ui');
    expect(loaderElement.className).toContain('loader');
  });

  it('should apply class name by size', () => {
    fixture.componentRef.setInput('suiSize', 'mini');
    fixture.detectChanges();
    expect(loaderElement.classList).toContain('mini');
  });

  it('should apply class name if active', () => {
    fixture.componentRef.setInput('suiActive', true);
    fixture.detectChanges();
    expect(loaderElement.classList).toContain('active');
  });

  it('should apply class name if inline', () => {
    fixture.componentRef.setInput('suiInline', 'centered');
    fixture.detectChanges();
    expect(loaderElement.classList).toContain('centered');
    expect(loaderElement.classList).toContain('inline');
  });
});

@Component({
  standalone: true,
  imports: [SuiLoaderDirective],
  template: `
    <div
      sui-loader
      [suiSize]="suiSize"
      [suiInline]="suiInline"
      [suiActive]="suiActive">
    </div>
  `
})
export class TestLoaderComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiInline: SuiLoaderInlineAlignment = null;
  @Input() suiActive = false;
}
