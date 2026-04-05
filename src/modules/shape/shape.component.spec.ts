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

@Component({
  standalone: true,
  imports: [SuiShapeComponent, SuiShapeSideComponent],
  template: `
    <sui-shape #shape>
      <sui-shape-side>Only</sui-shape-side>
    </sui-shape>
  `
})
class HostShapeSingleSideComponent {
  @ViewChild('shape') shape!: SuiShapeComponent;
}

@Component({
  standalone: true,
  imports: [SuiShapeComponent, SuiShapeSideComponent],
  template: `
    <sui-shape
      #shape
      [suiText]="true"
      [suiJitter]="2"
      [suiWidth]="200"
      [suiHeight]="120"
      [suiAllowRepeats]="true">
      <sui-shape-side class="first"><span>A</span></sui-shape-side>
      <sui-shape-side class="second"><span>B</span></sui-shape-side>
    </sui-shape>
  `
})
class HostShapeOptionsComponent {
  @ViewChild('shape') shape!: SuiShapeComponent;
}

function endTransition(sidesEl: HTMLElement, fixture: ComponentFixture<unknown>): void {
  sidesEl.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true}));
  fixture.detectChanges();
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

  it('repaint should not throw', () => {
    expect(() => fixture.componentInstance.shape.repaint()).not.toThrow();
  });

  it('refresh should resync side references without throwing', () => {
    expect(() => fixture.componentInstance.shape.refresh()).not.toThrow();
  });

  it('should unsubscribe side list subscription on destroy', () => {
    const f = TestBed.createComponent(HostShapeComponent);
    f.detectChanges();
    const shape = f.componentInstance.shape as unknown as {
      sidesChangeSub: {unsubscribe(): void; closed?: boolean} | null;
    };
    const sub = shape.sidesChangeSub;
    expect(sub).toBeTruthy();
    f.destroy();
    expect(sub!.closed).toBeTrue();
  });
});

describe('SuiShapeComponent (single side)', () => {
  let fixture: ComponentFixture<HostShapeSingleSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeSingleSideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeSingleSideComponent);
    fixture.detectChanges();
  });

  it('should not animate when fewer than two sides exist', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    shape.flipUp();
    tick();
    fixture.detectChanges();
    expect(shape.isAnimating()).toBeFalse();
  }));
});

describe('SuiShapeComponent (flip directions)', () => {
  let fixture: ComponentFixture<HostShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeComponent);
    fixture.detectChanges();
  });

  function expectSecondSideActive(f: ComponentFixture<HostShapeComponent>): void {
    const sides = f.debugElement.queryAll(By.css('.side'));
    expect(sides.length).toBe(2);
    expect(sides[1].nativeElement.classList.contains('active')).toBeTrue();
  }

  it('flipDown should advance the active side', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipDown();
    tick();
    fixture.detectChanges();
    endTransition(sidesEl, fixture);
    expect(fixture.debugElement.queryAll(By.css('.side.active')).length).toBe(1);
    expectSecondSideActive(fixture);
  }));

  it('flipLeft should advance the active side', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipLeft();
    tick();
    fixture.detectChanges();
    endTransition(sidesEl, fixture);
    expectSecondSideActive(fixture);
  }));

  it('flipRight should advance the active side', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipRight();
    tick();
    fixture.detectChanges();
    endTransition(sidesEl, fixture);
    expectSecondSideActive(fixture);
  }));

  it('flipOver should advance the active side', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipOver();
    tick();
    fixture.detectChanges();
    endTransition(sidesEl, fixture);
    expectSecondSideActive(fixture);
  }));

  it('flipBack should advance the active side', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipBack();
    tick();
    fixture.detectChanges();
    endTransition(sidesEl, fixture);
    expectSecondSideActive(fixture);
  }));

});

describe('SuiShapeComponent (edge cases)', () => {
  let fixture: ComponentFixture<HostShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeComponent);
    fixture.detectChanges();
  });

  it('setNextSide with no matching selector should fall back via setDefaultSide', () => {
    const shape = fixture.componentInstance.shape;
    expect(() => shape.setNextSide('.does-not-exist')).not.toThrow();
  });

  it('should queue a flip when invoked during an in-flight animation', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    shape.flipUp();
    tick();
    fixture.detectChanges();
    expect(shape.isAnimating()).toBeTrue();

    shape.flipUp();
    endTransition(sidesEl, fixture);
    tick();
    fixture.detectChanges();

    expect(shape.isAnimating()).toBeTrue();

    endTransition(sidesEl, fixture);
    tick();
    fixture.detectChanges();

    expect(shape.isAnimating()).toBeFalse();
    const active = fixture.debugElement.queryAll(By.css('.side.active'));
    expect(active.length).toBe(1);
    expect(active[0].nativeElement.textContent?.trim()).toContain('A');
  }));
});

@Component({
  standalone: true,
  imports: [SuiShapeComponent, SuiShapeSideComponent],
  template: `
    <sui-shape #shape [suiWidth]="'next'" [suiHeight]="'next'">
      <sui-shape-side class="first"><span>A</span></sui-shape-side>
      <sui-shape-side class="second"><span>B</span></sui-shape-side>
    </sui-shape>
  `
})
class HostShapeNextDimsComponent {
  @ViewChild('shape') shape!: SuiShapeComponent;
}

describe('SuiShapeComponent (options host)', () => {
  let fixture: ComponentFixture<HostShapeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeOptionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeOptionsComponent);
    fixture.detectChanges();
  });

  it('should apply text class and pixel stage size with jitter', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const root = fixture.debugElement.query(By.css('.ui.shape'))!.nativeElement as HTMLElement;
    expect(root.classList.contains('text')).toBeTrue();

    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipUp();
    tick();
    fixture.detectChanges();

    expect(shape.shapeInlineStyle.width).toContain('202');
    expect(shape.shapeInlineStyle.height).toContain('122');

    endTransition(sidesEl, fixture);
    tick();
    fixture.detectChanges();
  }));

  it('should allow flipping when next side equals active if suiAllowRepeats is true', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;

    shape.setNextSide('.first');
    shape.flipRight();
    tick();
    fixture.detectChanges();
    expect(shape.isAnimating()).toBeTrue();
    endTransition(sidesEl, fixture);
    tick();
    fixture.detectChanges();
  }));
});

describe('SuiShapeComponent (next width/height)', () => {
  let fixture: ComponentFixture<HostShapeNextDimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShapeNextDimsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostShapeNextDimsComponent);
    fixture.detectChanges();
  });

  it('should use next side dimensions when suiWidth and suiHeight are next', fakeAsync(() => {
    const shape = fixture.componentInstance.shape;
    const sidesEl = fixture.debugElement.query(By.css('.sides'))!.nativeElement as HTMLElement;
    shape.flipLeft();
    tick();
    fixture.detectChanges();
    expect(shape.shapeInlineStyle.width).toBeTruthy();
    expect(shape.shapeInlineStyle.height).toBeTruthy();
    endTransition(sidesEl, fixture);
    tick();
    fixture.detectChanges();
  }));
});
