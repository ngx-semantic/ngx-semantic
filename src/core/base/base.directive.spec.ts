import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseDirective } from './base.directive';

@Directive({
  standalone: true,
  selector: '[test-base]'
})
class TestBaseDirective extends BaseDirective {
  @Input() public variation = '';

  get classes(): string {
    return ['ui', this.variation, 'button'].join(' ');
  }
}

@Component({
  standalone: true,
  imports: [TestBaseDirective],
  template: `<div test-base class="custom" [class.active]="active" [variation]="variation"></div>`
})
class TestHostComponent {
  public variation = 'left labeled';
  public active = false;
}

describe('BaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.directive(TestBaseDirective)).nativeElement;
  });

  it('should apply classes in the declared order', () => {
    expect(element.className).toContain('ui left labeled button');
  });

  it('should keep the order when the classes change', () => {
    fixture.componentInstance.variation = 'right labeled';
    fixture.detectChanges();

    expect(element.className).toContain('ui right labeled button');
    expect(element.classList).not.toContain('left');
  });

  it('should preserve static and bound classes', () => {
    fixture.componentInstance.active = true;
    fixture.componentInstance.variation = '';
    fixture.detectChanges();

    expect(element.classList).toContain('custom');
    expect(element.classList).toContain('active');
    expect(element.classList).not.toContain('labeled');
    expect(element.className).toContain('ui button');
  });
});
