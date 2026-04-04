/**
 * Created by bolor on 4/26/2020
 */

import {Component, Input} from '@angular/core';
import {SuiImageDirective} from './image.directive';
import {By} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

describe('SuiImageComponent', () => {
  let component: TestImageComponent;
  let fixture: ComponentFixture<TestImageComponent>;
  let imageElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CommonModule, TestImageComponent, SuiImageDirective],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imageElement = fixture.debugElement.query(By.directive(SuiImageDirective)).nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class name', () => {
    expect(imageElement.className).toContain('ui');
    expect(imageElement.className).toContain('image');
  });

  it('should apply class name by size', () => {
    fixture.componentRef.setInput('suiSize', 'mini');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('mini');
    fixture.componentRef.setInput('suiSize', 'tiny');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('tiny');
    fixture.componentRef.setInput('suiSize', 'small');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('small');
    fixture.componentRef.setInput('suiSize', 'medium');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('medium');
    fixture.componentRef.setInput('suiSize', 'large');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('large');
    fixture.componentRef.setInput('suiSize', 'big');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('big');
    fixture.componentRef.setInput('suiSize', 'huge');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('huge');
    fixture.componentRef.setInput('suiSize', 'massive');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('massive');
  });

  it('should apply class name by state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(imageElement.classList).toContain('disabled');
    fixture.componentRef.setInput('suiHidden', true);
    fixture.detectChanges();
    expect(imageElement.classList).toContain('hidden');
  });

  it('should apply class name by other factors', () => {
    fixture.componentRef.setInput('suiFluid', true);
    fixture.detectChanges();
    expect(imageElement.classList).toContain('fluid');
    fixture.componentRef.setInput('suiCircular', true);
    fixture.detectChanges();
    expect(imageElement.classList).toContain('circular');
    fixture.componentRef.setInput('suiRounded', true);
    fixture.detectChanges();
    expect(imageElement.classList).toContain('rounded');
  });

  it('should apply class name by alignment', () => {
    fixture.componentRef.setInput('suiAlignment', 'middle aligned');
    fixture.detectChanges();
    expect(imageElement.classList).toContain('middle');
    expect(imageElement.classList).toContain('aligned');
  });
});

@Component({
  standalone: true,
  imports: [SuiImageDirective],
  template: `
    <div
      sui-image
      [suiSize]="suiSize"
      [disabled]="disabled"
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
  @Input() disabled = false;
  @Input() suiAvatar = false;
  @Input() suiBordered = false;
  @Input() suiFluid = false;
  @Input() suiRounded = false;
  @Input() suiCircular = false;
  @Input() suiCentered = false;
  @Input() suiSpaced = false;
  @Input() suiFloated = false;
}
