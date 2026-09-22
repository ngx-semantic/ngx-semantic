import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiVisibilityDirective } from './visibility.directive';
import { SuiVisibilityCalculations } from './visibility.types';

function rect(partial: Partial<DOMRect>): DOMRect {
  return {
    top: 0,
    left: 0,
    width: 200,
    height: 400,
    bottom: 400,
    right: 200,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...partial
  } as DOMRect;
}

function installWindowMocks(host: HTMLElement, hostRect: Partial<DOMRect>, opts?: {
  innerHeight?: number;
  scrollY?: number;
  context?: HTMLElement;
  contextRect?: Partial<DOMRect>;
}): {hostRect: {value: DOMRect}} {
  const current = { value: rect(hostRect) };
  spyOn(host, 'getBoundingClientRect').and.callFake(() => current.value);
  spyOnProperty(window, 'innerHeight', 'get').and.returnValue(opts?.innerHeight ?? 800);
  spyOnProperty(window, 'scrollY', 'get').and.returnValue(opts?.scrollY ?? 0);
  spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
  if (opts?.context) {
    spyOn(opts.context, 'getBoundingClientRect').and.returnValue(rect({
      top: 0,
      height: 200,
      bottom: 200,
      width: 300,
      ...opts.contextRect
    }));
  }
  return { hostRect: current };
}

@Component({
  standalone: true,
  imports: [SuiVisibilityDirective],
  template: `
    <div
      suiVisibility
      [suiOnce]="once"
      [suiContinuous]="continuous"
      [suiInitialCheck]="false"
      [suiPassed]="passed"
      (suiOnOnScreen)="onScreen.push($event)"
      (suiOnOffScreen)="offScreen.push($event)"
      (suiOnTopVisible)="topVisible.push($event)"
      (suiOnTopPassed)="topPassed.push($event)"
      (suiOnBottomPassed)="bottomPassed.push($event)"
      (suiOnPassing)="passing.push($event)"
      (suiOnTopVisibleReverse)="topVisibleReverse.push($event)"
      (suiOnTopPassedReverse)="topPassedReverse.push($event)"
      (suiOnUpdate)="updates.push($event)"
      (suiOnPassed)="passedEvents.push($event.amount)"
      (suiOnRefresh)="onRefresh()"
      #vis="suiVisibility"
    >
      target
    </div>
  `
})
class HostVisibilityComponent {
  @ViewChild('vis') vis!: SuiVisibilityDirective;
  once = true;
  continuous = false;
  passed: Record<string, boolean> | null = null;
  onScreen: SuiVisibilityCalculations[] = [];
  offScreen: SuiVisibilityCalculations[] = [];
  topVisible: SuiVisibilityCalculations[] = [];
  topPassed: SuiVisibilityCalculations[] = [];
  bottomPassed: SuiVisibilityCalculations[] = [];
  passing: SuiVisibilityCalculations[] = [];
  topVisibleReverse: SuiVisibilityCalculations[] = [];
  topPassedReverse: SuiVisibilityCalculations[] = [];
  updates: SuiVisibilityCalculations[] = [];
  passedEvents: string[] = [];
  refreshes = 0;

  onRefresh(): void {
    this.refreshes += 1;
  }
}

@Component({
  standalone: true,
  imports: [SuiVisibilityDirective],
  template: `
    <img
      suiVisibility
      suiType="image"
      [suiInitialCheck]="false"
      data-src="late.jpg"
      (suiOnLoad)="onLoad()"
      #vis="suiVisibility"
    />
  `
})
class ImageHostComponent {
  @ViewChild('vis') vis!: SuiVisibilityDirective;
  loads = 0;

  onLoad(): void {
    this.loads += 1;
  }
}

@Component({
  standalone: true,
  imports: [SuiVisibilityDirective],
  template: `
    <div id="wrap">
      <div
        suiVisibility
        suiType="fixed"
        [suiInitialCheck]="false"
        [suiOffset]="12"
        [suiZIndex]="5"
        (suiOnFixed)="onFixed()"
        (suiOnUnfixed)="onUnfixed()"
        #vis="suiVisibility"
      >
        bar
      </div>
    </div>
  `
})
class FixedHostComponent {
  @ViewChild('vis') vis!: SuiVisibilityDirective;
  fixed = 0;
  unfixed = 0;

  onFixed(): void {
    this.fixed += 1;
  }

  onUnfixed(): void {
    this.unfixed += 1;
  }
}

@Component({
  standalone: true,
  imports: [SuiVisibilityDirective],
  template: `
    <div id="scrollHost" style="overflow: auto; height: 200px">
      <div
        suiVisibility
        suiContext="#scrollHost"
        [suiInitialCheck]="false"
        (suiOnUpdate)="updates.push($event)"
        #vis="suiVisibility"
      >
        inner
      </div>
    </div>
  `
})
class ContextHostComponent {
  @ViewChild('vis') vis!: SuiVisibilityDirective;
  updates: SuiVisibilityCalculations[] = [];
}

describe('SuiVisibilityDirective', () => {
  describe('viewport callbacks', () => {
    let fixture: ComponentFixture<HostVisibilityComponent>;
    let host: HostVisibilityComponent;
    let el: HTMLElement;
    let geom: {hostRect: {value: DOMRect}};

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostVisibilityComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(HostVisibilityComponent);
      fixture.detectChanges();
      host = fixture.componentInstance;
      el = fixture.nativeElement.querySelector('[suiVisibility]') as HTMLElement;
      geom = installWindowMocks(el, { top: 100, bottom: 500, height: 400 });
    });

    it('emits onScreen and topVisible for an in-view element', () => {
      host.vis.check();
      expect(host.onScreen.length).toBe(1);
      expect(host.topVisible.length).toBe(1);
      expect(host.updates.length).toBe(1);
      expect(host.topPassed.length).toBe(0);
    });

    it('does not re-emit once callbacks on subsequent checks', () => {
      host.vis.check();
      host.vis.check();
      expect(host.onScreen.length).toBe(1);
      expect(host.topVisible.length).toBe(1);
    });

    it('re-emits on rising edge when once is false', () => {
      host.vis.suiOnce = false;
      host.vis.check();
      geom.hostRect.value = rect({ top: 900, bottom: 1300, height: 400 });
      host.vis.check();
      geom.hostRect.value = rect({ top: 100, bottom: 500, height: 400 });
      host.vis.check();
      expect(host.topVisible.length).toBe(2);
      expect(host.topVisibleReverse.length).toBe(1);
    });

    it('emits continuously while the condition holds', () => {
      host.vis.suiContinuous = true;
      host.vis.check();
      host.vis.check();
      expect(host.topVisible.length).toBe(2);
    });

    it('emits topPassed, passing, and onPassed amounts', () => {
      host.vis.suiPassed = { '10%': true };
      geom.hostRect.value = rect({ top: -80, bottom: 320, height: 400 });
      host.vis.check();
      expect(host.topPassed.length).toBe(1);
      expect(host.passing.length).toBe(1);
      expect(host.passedEvents).toEqual(['10%']);
    });

    it('emits bottomPassed and offScreen when the element is above the viewport', () => {
      geom.hostRect.value = rect({ top: -500, bottom: -100, height: 400 });
      host.vis.check();
      expect(host.bottomPassed.length).toBe(1);
      expect(host.offScreen.length).toBe(1);
      expect(host.onScreen.length).toBe(0);
    });

    it('refresh clears occurred flags and emits suiOnRefresh', () => {
      host.vis.check();
      expect(host.topVisible.length).toBe(1);
      host.vis.refresh();
      expect(host.refreshes).toBe(1);
      expect(host.topVisible.length).toBe(2);
    });

    it('disable skips checks until enable', () => {
      host.vis.disable();
      host.vis.check();
      expect(host.updates.length).toBe(0);
      host.vis.enable();
      expect(host.updates.length).toBe(1);
    });
  });

  describe('type: image', () => {
    it('copies data-src to src when top becomes visible', async () => {
      await TestBed.configureTestingModule({
        imports: [ImageHostComponent]
      }).compileComponents();
      const fixture = TestBed.createComponent(ImageHostComponent);
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
      installWindowMocks(img, { top: 100, bottom: 200, height: 100 });
      fixture.componentInstance.vis.check();
      expect(img.getAttribute('src')).toBe('late.jpg');
      expect(img.hasAttribute('data-src')).toBeFalse();
      expect(fixture.componentInstance.loads).toBe(1);
    });
  });

  describe('type: fixed', () => {
    it('adds a placeholder and fixed styles when top is passed', async () => {
      await TestBed.configureTestingModule({
        imports: [FixedHostComponent]
      }).compileComponents();
      const fixture = TestBed.createComponent(FixedHostComponent);
      fixture.detectChanges();
      const bar = fixture.nativeElement.querySelector('[suiVisibility]') as HTMLElement;
      const geom = installWindowMocks(bar, { top: -20, bottom: 20, height: 40, width: 200 });
      fixture.componentInstance.vis.check();
      expect(fixture.componentInstance.fixed).toBe(1);
      expect(bar.classList.contains('fixed')).toBeTrue();
      expect(bar.style.position).toBe('fixed');
      expect(bar.style.top).toBe('12px');
      const placeholder = fixture.nativeElement.querySelector('#wrap > div:not([suiVisibility])') as HTMLElement;
      expect(placeholder).toBeTruthy();
      expect(placeholder.style.height).toBe('40px');

      geom.hostRect.value = rect({ top: 40, bottom: 80, height: 40, width: 200 });
      fixture.componentInstance.vis.check();
      expect(fixture.componentInstance.unfixed).toBe(1);
      expect(bar.classList.contains('fixed')).toBeFalse();
    });
  });

  describe('custom scroll context', () => {
    it('uses the context element bounds for calculations', async () => {
      await TestBed.configureTestingModule({
        imports: [ContextHostComponent]
      }).compileComponents();
      const fixture = TestBed.createComponent(ContextHostComponent);
      fixture.detectChanges();
      const inner = fixture.nativeElement.querySelector('[suiVisibility]') as HTMLElement;
      const ctx = fixture.nativeElement.querySelector('#scrollHost') as HTMLElement;
      installWindowMocks(inner, { top: 50, bottom: 150, height: 100 }, {
        context: ctx,
        contextRect: { top: 0, height: 200, bottom: 200 }
      });
      fixture.componentInstance.vis.check();
      expect(fixture.componentInstance.updates.length).toBe(1);
      expect(fixture.componentInstance.updates[0].onScreen).toBeTrue();
    });
  });
});
