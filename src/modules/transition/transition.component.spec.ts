import { Component, SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SuiTransitionComponent } from './transition.component';

const transitionTemplate = `
    <sui-transition
      #tr="suiTransition"
      [suiAnimation]="animation"
      [suiDuration]="duration"
      [(suiVisible)]="visible"
      [suiDirection]="direction"
      [suiDisabled]="disabled"
      [suiPlay]="play"
      (suiAnimationStart)="bumpStart()"
      (suiAnimationComplete)="bumpComplete()"
      (suiOnShow)="bumpShow()"
      (suiOnHide)="bumpHide()">
      <span class="inner">x</span>
    </sui-transition>
  `;

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: transitionTemplate
})
class HostComponent {
  animation = 'fade';
  duration: number | string = 50;
  visible = true;
  direction: 'auto' | 'in' | 'out' = 'auto';
  disabled = false;
  play = 0;
  starts = 0;
  completes = 0;
  shows = 0;
  hides = 0;

  bumpStart(): void {
    this.starts++;
  }

  bumpComplete(): void {
    this.completes++;
  }

  bumpShow(): void {
    this.shows++;
  }

  bumpHide(): void {
    this.hides++;
  }
}

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: transitionTemplate
})
class HostDisabledComponent extends HostComponent {
  override disabled = true;
}

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: transitionTemplate
})
class HostPulseComponent extends HostComponent {
  override animation = 'pulse';
}

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: transitionTemplate
})
class HostFadeUpComponent extends HostComponent {
  override animation = 'fade up';
}

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: transitionTemplate
})
class HostFadeInComponent extends HostComponent {
  override animation = 'fade in';
}

@Component({
  standalone: true,
  imports: [SuiTransitionComponent],
  template: `
    <sui-transition [suiVisible]="false">
      <span></span>
    </sui-transition>
  `
})
class StartHiddenHost {}

function createFixture<T extends HostComponent>(
  C: new () => T
): { fixture: ComponentFixture<T>; host: T; cmp: () => SuiTransitionComponent; el: () => HTMLElement } {
  const fixture = TestBed.createComponent(C);
  const host = fixture.componentInstance;
  fixture.detectChanges();
  return {
    fixture,
    host,
    cmp: () =>
      fixture.debugElement.query(By.directive(SuiTransitionComponent))
        .componentInstance as SuiTransitionComponent,
    el: () => fixture.nativeElement.querySelector('sui-transition') as HTMLElement
  };
}

describe('SuiTransitionComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('default host', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('should create', () => {
      const { host, cmp } = createFixture(HostComponent);
      expect(host).toBeTruthy();
      expect(cmp()).toBeTruthy();
    });

    it('should project content', () => {
      const { fixture } = createFixture(HostComponent);
      expect(fixture.nativeElement.querySelector('.inner')?.textContent).toBe('x');
    });

    it('should apply transition and visible classes on init', () => {
      const { el } = createFixture(HostComponent);
      expect(el().className).toContain('transition');
      expect(el().className).toContain('visible');
      expect(el().className).not.toContain('hidden');
    });

    it('should run hide transition and emit outputs', fakeAsync(() => {
      const { fixture, host, cmp, el } = createFixture(HostComponent);
      cmp().hide();
      fixture.detectChanges();
      tick();
      expect(host.starts).toBeGreaterThan(0);
      expect(host.completes).toBeGreaterThan(0);
      expect(host.hides).toBeGreaterThan(0);
      expect(el().className).toContain('hidden');
      expect(cmp().hidden).toBe(true);
    }));

    it('should run show transition after hide', fakeAsync(() => {
      const { fixture, host, cmp, el } = createFixture(HostComponent);
      cmp().hide();
      tick();
      fixture.detectChanges();
      const afterHide = host.completes;
      cmp().show();
      tick();
      fixture.detectChanges();
      expect(host.completes).toBeGreaterThan(afterHide);
      expect(host.shows).toBeGreaterThan(0);
      expect(el().className).toContain('visible');
    }));

    it('toggle should flip visibility', fakeAsync(() => {
      const { fixture, host, cmp } = createFixture(HostComponent);
      expect(host.visible).toBe(true);
      cmp().toggle();
      tick();
      fixture.detectChanges();
      expect(host.visible).toBe(false);
      cmp().toggle();
      tick();
      fixture.detectChanges();
      expect(host.visible).toBe(true);
    }));

    it('stop should be safe when idle and clear animating when in flight', fakeAsync(() => {
      const { fixture, host, cmp } = createFixture(HostComponent);
      cmp().stop();
      expect(cmp().animating).toBe(false);
      host.duration = 5000;
      fixture.detectChanges();
      cmp().hide();
      fixture.detectChanges();
      if (cmp().animating) {
        cmp().stop();
        fixture.detectChanges();
        expect(cmp().animating).toBe(false);
      }
    }));

    it('setVisible should no-op when unchanged', () => {
      const { fixture, host, cmp } = createFixture(HostComponent);
      const c = host.completes;
      cmp().setVisible(true);
      fixture.detectChanges();
      expect(host.completes).toBe(c);
    });
  });

  describe('HostDisabledComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostDisabledComponent],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('suiDisabled should skip animation but still update visibility', fakeAsync(() => {
      const { fixture, host, cmp, el } = createFixture(HostDisabledComponent);
      cmp().hide();
      fixture.detectChanges();
      tick();
      expect(host.hides).toBe(1);
      expect(el().className).toContain('hidden');
      expect(cmp().animating).toBe(false);
    }));
  });

  describe('HostPulseComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostPulseComponent],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('playStatic should run for pulse', fakeAsync(() => {
      const { fixture, host, cmp } = createFixture(HostPulseComponent);
      const before = host.completes;
      cmp().playStatic();
      tick();
      fixture.detectChanges();
      expect(host.completes).toBeGreaterThan(before);
      expect(host.starts).toBeGreaterThan(0);
    }));

    it('suiPlay change should trigger static replay', fakeAsync(() => {
      const { fixture, host, cmp } = createFixture(HostPulseComponent);
      const s0 = host.starts;
      const c = cmp();
      c.suiPlay = 1;
      c.ngOnChanges({ suiPlay: new SimpleChange(0, 1, false) });
      tick();
      fixture.detectChanges();
      expect(host.starts).toBeGreaterThan(s0);
    }));
  });

  describe('HostFadeUpComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostFadeUpComponent],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('should add animation token classes to host', () => {
      const { el } = createFixture(HostFadeUpComponent);
      expect(el().className).toContain('fade');
      expect(el().className).toContain('up');
    });
  });

  describe('HostFadeInComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostFadeInComponent],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('forced in suffix should still end hidden when hiding', fakeAsync(() => {
      const { fixture, host, cmp } = createFixture(HostFadeInComponent);
      cmp().hide();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(host.hides).toBeGreaterThan(0);
      expect(cmp().hidden).toBe(true);
    }));
  });

  describe('initial hidden', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StartHiddenHost],
        providers: [provideNoopAnimations()]
      }).compileComponents();
    });

    it('should start hidden when suiVisible is false', () => {
      const fix = TestBed.createComponent(StartHiddenHost);
      fix.detectChanges();
      const el = fix.nativeElement.querySelector('sui-transition') as HTMLElement;
      const c = fix.debugElement.query(By.directive(SuiTransitionComponent))
        .componentInstance as SuiTransitionComponent;
      expect(el.className).toContain('hidden');
      expect(c.hidden).toBe(true);
    });
  });
});
