import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiShapeComponent} from './shape.component';
import {SuiShapeSideComponent} from './shape-side.component';

@Component({
  standalone: true,
  imports: [SuiShapeComponent, SuiShapeSideComponent],
  template: `
    <sui-shape #shape [suiCube]="true" [suiText]="false" [suiDuration]="300">
      <sui-shape-side class="first"><span>A</span></sui-shape-side>
      <sui-shape-side class="second"><span>B</span></sui-shape-side>
    </sui-shape>
  `
})
class HostShapeComponent {
  @ViewChild('shape') shape!: SuiShapeComponent;
}

describe('SuiShapeComponent', () => {
  let fixture: ComponentFixture<HostShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.shape).toBeTruthy();
  });

  it('should render Semantic UI shape structure', () => {
    const shape = fixture.debugElement.query(By.css('.ui.shape'));
    expect(shape).toBeTruthy();
    expect(shape.nativeElement.classList.contains('cube')).toBeTrue();
    expect(shape.nativeElement.classList.contains('text')).toBeFalse();

    const sides = fixture.debugElement.query(By.css('.sides'));
    expect(sides).toBeTruthy();

    const sideEls = fixture.debugElement.queryAll(By.css('.side'));
    expect(sideEls.length).toBe(2);
  });

  it('should mark the first side active by default', () => {
    const sides = fixture.debugElement.queryAll(By.css('.side'));
    expect(sides[0].nativeElement.classList.contains('active')).toBeTrue();
    expect(sides[1].nativeElement.classList.contains('active')).toBeFalse();
  });

  it('should flip to the next side when transition ends', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    shape.flipUp();
    tick();
    fixture.detectChanges();

    expect(shape.isAnimating()).toBeTrue();

    sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
    fixture.detectChanges();

    expect(shape.isAnimating()).toBeFalse();
    const sideEls = fixture.debugElement.queryAll(By.css('.side'));
    expect(sideEls[0].nativeElement.classList.contains('active')).toBeFalse();
    expect(sideEls[1].nativeElement.classList.contains('active')).toBeTrue();
  }));

  it('should emit suiBeforeChange and suiOnChange when flipping', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    let before: SuiShapeSideComponent | undefined;
    let after: SuiShapeSideComponent | undefined;

    shape.suiBeforeChange.subscribe((s) => (before = s));
    shape.suiOnChange.subscribe((s) => (after = s));

    shape.flipUp();
    tick();
    fixture.detectChanges();
    sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
    fixture.detectChanges();

    expect(before).toBeTruthy();
    expect(after).toBeTruthy();
    expect(after!.nativeElement.textContent?.trim()).toContain('B');
  }));

  it('setNextSide should choose which face receives the next flip', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    shape.flipUp();
    tick();
    fixture.detectChanges();
    sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
    fixture.detectChanges();

    shape.setNextSide('.first');
    shape.flipRight();
    tick();
    fixture.detectChanges();
    sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
    fixture.detectChanges();

    const sideEls = fixture.debugElement.queryAll(By.css('.side'));
    expect(sideEls[0].nativeElement.classList.contains('active')).toBeTrue();
  }));

  it('reset should clear animating state and inline styles', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    shape.flipUp();
    tick();
    fixture.detectChanges();
    shape.reset();
    fixture.detectChanges();

    expect(shape.isAnimating()).toBeFalse();
    expect(Object.keys(shape.shapeInlineStyle).length).toBe(0);
  }));

  it('flip() should run the named flip behavior', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    shape.flip('flip up');
    tick();
    fixture.detectChanges();
    sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
    fixture.detectChanges();

    const sideEls = fixture.debugElement.queryAll(By.css('.side'));
    expect(sideEls[1].nativeElement.classList.contains('active')).toBeTrue();
  }));
});
