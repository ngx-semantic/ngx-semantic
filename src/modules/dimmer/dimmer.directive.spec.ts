import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDimmerDirective } from './dimmer.directive';
import { SuiDimmerModule } from './dimmer.module';

@Component({
  standalone: true,
  imports: [SuiDimmerModule],
  template: `
    <div
      sui-dimmer
      [(dimmed)]="isDimmed"
      [disabled]="disabled"
      [suiCloseOnClick]="closeOnClick"
      [suiDimmerAlignment]="alignment"
      [suiDimmerBlurring]="blurring"
      [suiDimmerInverted]="inverted"
      [suiDimmerSimple]="simple"
      [suiDimmerFullPage]="fullPage">
      <ng-template suiDimmerContent>
        <span class="dimmer-inner">content</span>
      </ng-template>
    </div>
  `
})
class DimmerHostComponent {
  @Input() isDimmed = false;
  @Input() disabled = false;
  @Input() closeOnClick = false;
  @Input() alignment: 'top' | 'bottom' | null = null;
  @Input() blurring = false;
  @Input() inverted = false;
  @Input() simple = false;
  @Input() fullPage = false;
}

describe('SuiDimmerDirective', () => {
  let fixture: ComponentFixture<DimmerHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimmerHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DimmerHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiDimmerDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply dimmable host classes', () => {
    expect(el.className).toContain('dimmable');
  });

  it('adds dimmed class when dimmed is true', () => {
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(el.classList.contains('dimmed')).toBe(true);
    expect(el.querySelector('sui-dimmer')).toBeTruthy();
  });

  it('removes dimmer from DOM when dimmed becomes false', () => {
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(el.querySelector('sui-dimmer')).toBeTruthy();
    fixture.componentRef.setInput('isDimmed', false);
    fixture.detectChanges();
    expect(el.querySelector('sui-dimmer')).toBeFalsy();
  });

  it('ignores dimmed input when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(el.classList.contains('dimmed')).toBe(false);
    expect(el.querySelector('sui-dimmer')).toBeFalsy();
  });

  it('sets blurring class on host when suiDimmerBlurring is true', () => {
    fixture.componentRef.setInput('blurring', true);
    fixture.detectChanges();
    expect(el.className).toContain('blurring');
  });

  it('closes when dimmer is clicked and suiCloseOnClick is true', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const dimmerEl = el.querySelector('sui-dimmer') as HTMLElement;
    expect(dimmerEl).toBeTruthy();
    const inner = dimmerEl.querySelector('div');
    expect(inner).toBeTruthy();
    inner!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(false);
  });

  it('passes alignment and flags into dimmer component', () => {
    fixture.componentRef.setInput('alignment', 'top');
    fixture.componentRef.setInput('inverted', true);
    fixture.componentRef.setInput('simple', true);
    fixture.componentRef.setInput('fullPage', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const dimmerEl = el.querySelector('sui-dimmer div') as HTMLElement;
    expect(dimmerEl.className).toContain('top');
    expect(dimmerEl.className).toContain('inverted');
    expect(dimmerEl.className).toContain('simple');
    expect(dimmerEl.className).toContain('page');
  });

  it('destroys without error when dimmer and click listener were active', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
