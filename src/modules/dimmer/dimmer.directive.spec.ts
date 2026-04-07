import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
      [suiDimmerFullPage]="fullPage"
      [suiDimmerOn]="dimmerOn"
      [suiDimmerDuration]="duration"
      [suiDimmerTransition]="transition"
      [suiDimmerName]="dimmerName"
      (suiDimmerShow)="showCount = showCount + 1"
      (suiDimmerHide)="hideCount = hideCount + 1">
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
  @Input() dimmerOn: 'hover' | 'click' | null = null;
  @Input() duration: number | null = null;
  @Input() transition: string | null = null;
  @Input() dimmerName: string | null = null;
  showCount = 0;
  hideCount = 0;
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

  it('sets disabled class on host when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(el.classList.contains('disabled')).toBe(true);
  });

  it('clears dimmed and emits when disabled becomes true while dimmed', fakeAsync(() => {
    const spy = jasmine.createSpy('dimmedChange');
    const dir = fixture.debugElement.query(By.directive(SuiDimmerDirective)).injector.get(SuiDimmerDirective);
    dir.dimmedChange.subscribe(spy);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(el.classList.contains('dimmed')).toBe(true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(el.classList.contains('dimmed')).toBe(false);
    tick();
    expect(spy).toHaveBeenCalledWith(false);
  }));

  it('sets blurring class on host when suiDimmerBlurring is true', () => {
    fixture.componentRef.setInput('blurring', true);
    fixture.detectChanges();
    expect(el.className).toContain('blurring');
  });

  it('closes when dimmer backdrop is clicked and suiCloseOnClick is true', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const dimmerEl = el.querySelector('sui-dimmer') as HTMLElement;
    expect(dimmerEl).toBeTruthy();
    const backdrop = dimmerEl.querySelector('div.ui.dimmer') as HTMLElement;
    expect(backdrop).toBeTruthy();
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(false);
  });

  it('does not close when dimmer content is clicked and suiCloseOnClick is true', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const inner = el.querySelector('.dimmer-inner') as HTMLElement;
    expect(inner).toBeTruthy();
    inner.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(true);
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

  it('updates inner dimmer classes when inputs change while dimmed', () => {
    fixture.componentRef.setInput('isDimmed', true);
    fixture.componentRef.setInput('inverted', false);
    fixture.detectChanges();
    let dimmerEl = el.querySelector('sui-dimmer div') as HTMLElement;
    expect(dimmerEl.className).not.toContain('inverted');
    fixture.componentRef.setInput('inverted', true);
    fixture.detectChanges();
    dimmerEl = el.querySelector('sui-dimmer div') as HTMLElement;
    expect(dimmerEl.className).toContain('inverted');
  });

  it('backdrop still closes after input churn with closeOnClick', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('alignment', 'top');
    fixture.detectChanges();
    fixture.componentRef.setInput('alignment', 'bottom');
    fixture.detectChanges();
    const backdrop = el.querySelector('sui-dimmer div.ui.dimmer') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(false);
  });

  it('emits suiDimmerShow and suiDimmerHide when dimmer is mounted and unmounted', () => {
    expect(fixture.componentInstance.showCount).toBe(0);
    expect(fixture.componentInstance.hideCount).toBe(0);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.showCount).toBe(1);
    fixture.componentRef.setInput('isDimmed', false);
    fixture.detectChanges();
    expect(fixture.componentInstance.hideCount).toBe(1);
  });

  it('applies duration and transition to dimmer element', () => {
    fixture.componentRef.setInput('duration', 250);
    fixture.componentRef.setInput('transition', 'fade');
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const dimmerEl = el.querySelector('sui-dimmer div.ui.dimmer') as HTMLElement;
    expect(dimmerEl.style.transitionDuration).toBe('250ms');
    expect(dimmerEl.className).toContain('fade');
  });

  it('sets data-dimmer-name when suiDimmerName is set', () => {
    fixture.componentRef.setInput('dimmerName', 'primary');
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    const dimmerEl = el.querySelector('sui-dimmer div.ui.dimmer') as HTMLElement;
    expect(dimmerEl.getAttribute('data-dimmer-name')).toBe('primary');
  });

  it('shows and hides dimmer on hover when suiDimmerOn is hover', () => {
    fixture.componentRef.setInput('dimmerOn', 'hover');
    fixture.detectChanges();
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(true);
    expect(el.querySelector('sui-dimmer')).toBeTruthy();
    el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(false);
  });

  it('toggles dimmer on host click when suiDimmerOn is click', () => {
    fixture.componentRef.setInput('dimmerOn', 'click');
    fixture.detectChanges();
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(true);
    const backdrop = el.querySelector('sui-dimmer div.ui.dimmer') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isDimmed).toBe(false);
  });

  it('destroys without error when dimmer and click listener were active', () => {
    fixture.componentRef.setInput('closeOnClick', true);
    fixture.componentRef.setInput('isDimmed', true);
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
