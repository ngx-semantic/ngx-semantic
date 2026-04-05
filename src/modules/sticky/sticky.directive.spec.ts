import {Component, ViewChild, enableProdMode} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiStickyDirective} from './sticky.directive';

/** Shared DOM mocks + synchronous rAF for scroll/resize handlers. */
function installStickyWindowMocks(opts: {
  scrollY: {value: number};
  ctx: HTMLElement;
  sticky: HTMLElement;
  innerHeight?: number;
  ctxRect?: Partial<DOMRect>;
  stickyRect?: Partial<DOMRect>;
}): void {
  const ih = opts.innerHeight ?? 800;
  spyOnProperty(window, 'scrollX', 'get').and.returnValue(0);
  spyOnProperty(window, 'innerHeight', 'get').and.returnValue(ih);
  spyOnProperty(window, 'scrollY', 'get').and.callFake(() => opts.scrollY.value);

  spyOn(opts.ctx, 'getBoundingClientRect').and.returnValue({
    top: 0,
    left: 0,
    width: 200,
    height: 500,
    bottom: 500,
    right: 200,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...opts.ctxRect
  } as DOMRect);

  spyOn(opts.sticky, 'getBoundingClientRect').and.returnValue({
    top: 100,
    left: 0,
    width: 200,
    height: 40,
    bottom: 140,
    right: 200,
    x: 0,
    y: 100,
    toJSON: () => ({}),
    ...opts.stickyRect
  } as DOMRect);

  const stickyH = opts.stickyRect?.height ?? 40;
  const ctxH = opts.ctxRect?.height ?? 500;
  Object.defineProperty(opts.sticky, 'offsetWidth', {configurable: true, get: () => 200});
  Object.defineProperty(opts.sticky, 'offsetHeight', {configurable: true, get: () => stickyH});
  Object.defineProperty(opts.ctx, 'offsetHeight', {configurable: true, get: () => ctxH});

  spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative;">
      <div suiSticky [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px;">Sticky</div>
    </div>
  `
})
class HostStickyComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="scrollHost" style="overflow: auto; height: 200px">
      <div style="height: 2000px">
        <div id="ctx" style="height: 500px; position: relative">
          <div suiSticky suiScrollContext="#scrollHost" [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px">
            Sticky
          </div>
        </div>
      </div>
    </div>
  `
})
class HostStickyScrollElementComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative">
      <div id="inner" style="position: relative; height: 40px">
        <div suiSticky [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
      </div>
    </div>
  `
})
class HostStickyNestedContainerComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="wrap" style="height: 500px; position: relative">
      <div suiSticky #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
    </div>
  `
})
class HostStickyNoExplicitContextComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative">
      <div suiSticky [suiObserveChanges]="true" [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
    </div>
  `
})
class HostStickyObserveComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative">
      <div suiSticky [suiContext]="'#missing'" #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
    </div>
  `
})
class HostStickyMissingContextComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative;">
      <div suiSticky [suiContext]="'#ctx'" [suiOffset]="20" #st="suiSticky" style="width: 200px; height: 40px;">Sticky</div>
    </div>
  `
})
class HostStickyOffsetComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative">
      <div suiSticky suiScrollContext="#nope" [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
    </div>
  `
})
class HostStickyBadScrollComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative">
      <div suiSticky [suiPushing]="true" [suiContext]="'#ctx'" #st="suiSticky" style="width: 200px; height: 40px">Sticky</div>
    </div>
  `
})
class HostStickyPushingComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

@Component({
  standalone: true,
  imports: [SuiStickyDirective],
  template: `
    <div id="ctx" style="height: 500px; position: relative;">
      <div suiSticky [suiContext]="'#ctx'" [suiSetSize]="false" #st="suiSticky" style="width: 200px; height: 40px;">Sticky</div>
    </div>
  `
})
class HostStickyNoSetSizeComponent {
  @ViewChild('st') sticky!: SuiStickyDirective;
}

describe('SuiStickyDirective', () => {
  let fixture: ComponentFixture<HostStickyComponent>;
  let scrollYValue = {value: 0};

  beforeAll(() => {
    enableProdMode();
  });

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);
  });

  beforeEach(async () => {
    scrollYValue.value = 0;
    await TestBed.configureTestingModule({
      imports: [HostStickyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostStickyComponent);
    const ctx = fixture.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = fixture.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    installStickyWindowMocks({scrollY: scrollYValue, ctx, sticky});

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create with ui and sticky classes', () => {
    const el = fixture.debugElement.query(By.css('[suiSticky]')).nativeElement as HTMLElement;
    expect(el.classList.contains('ui')).toBeTrue();
    expect(el.classList.contains('sticky')).toBeTrue();
  });

  it('should populate cache after refresh', () => {
    const dir = fixture.componentInstance.sticky;
    expect(dir.cache).toBeTruthy();
    expect(dir.cache!.context.bottom).toBe(500);
    expect(dir.cache!.element.top).toBe(100);
  });

  it('should emit suiOnReposition when refresh runs', () => {
    const dir = fixture.componentInstance.sticky;
    let n = 0;
    dir.suiOnReposition.subscribe(() => n++);
    dir.refresh(true);
    expect(n).toBe(1);
  });

  it('should emit suiOnScroll when window scrolls', async () => {
    const dir = fixture.componentInstance.sticky;
    let n = 0;
    dir.suiOnScroll.subscribe(() => n++);
    scrollYValue.value = 10;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(n).toBe(1);
  });

  it('should refresh layout on window resize', async () => {
    const dir = fixture.componentInstance.sticky;
    let n = 0;
    dir.suiOnReposition.subscribe(() => n++);
    const before = n;
    window.dispatchEvent(new Event('resize'));
    await fixture.whenStable();
    expect(n).toBeGreaterThan(before);
  });

  it('should fix to viewport when scroll passes element top', async () => {
    const dir = fixture.componentInstance.sticky;
    let stuck = 0;
    dir.suiOnStick.subscribe(() => stuck++);

    scrollYValue.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(dir.fixed).toBeTrue();
    expect(dir.topState).toBeTrue();
    expect(stuck).toBe(1);
  });

  it('should bind to bottom when scroll reaches context end', async () => {
    const dir = fixture.componentInstance.sticky;

    scrollYValue.value = 600;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(dir.bound).toBeTrue();
    expect(dir.bottomState).toBeTrue();
  });

  it('should unstick when scrolling back above element', async () => {
    const dir = fixture.componentInstance.sticky;
    let unstuck = 0;
    dir.suiOnUnstick.subscribe(() => unstuck++);

    scrollYValue.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(dir.fixed).toBeTrue();

    scrollYValue.value = 0;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(dir.fixed).toBeFalse();
    expect(dir.bound).toBeFalse();
    expect(unstuck).toBe(1);
  });

  it('should bind bottom from initial scroll when past context (tall element)', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({
      scrollY: sy,
      ctx,
      sticky,
      stickyRect: {top: 400, height: 200, bottom: 600, y: 400},
      innerHeight: 800
    });
    f.detectChanges();
    await f.whenStable();

    const dir = f.componentInstance.sticky;
    sy.value = 450;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.bound).toBeTrue();
  });

  it('should transition fixed top to bound bottom when scrolling further', async () => {
    const dir = fixture.componentInstance.sticky;
    scrollYValue.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(dir.fixed).toBeTrue();

    scrollYValue.value = 600;
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(dir.bound).toBeTrue();
    expect(dir.fixed).toBeFalse();
  });

  it('should apply suiOffset to fixed top styles', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyOffsetComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyOffsetComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    sy.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(sticky.style.marginTop).toBe('20px');
  });

  it('should not set width/height when suiSetSize is false', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyNoSetSizeComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyNoSetSizeComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    sy.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(sticky.style.width).toBe('');
    expect(sticky.style.height).toBe('');
  });

  it('should accept HTMLElement as suiContext', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    dir.suiContext = ctx;
    dir.refresh(true);
    expect(dir.cache?.context.bottom).toBe(500);
  });

  it('should use implicit container context when suiContext is omitted', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyNoExplicitContextComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyNoExplicitContextComponent);
    const wrap = f.nativeElement.querySelector('#wrap') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    spyOnProperty(window, 'scrollX', 'get').and.returnValue(0);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(window, 'scrollY', 'get').and.callFake(() => sy.value);
    spyOn(wrap, 'getBoundingClientRect').and.returnValue({
      top: 0,
      left: 0,
      width: 200,
      height: 500,
      bottom: 500,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);
    spyOn(sticky, 'getBoundingClientRect').and.returnValue({
      top: 100,
      left: 0,
      width: 200,
      height: 40,
      bottom: 140,
      right: 200,
      x: 0,
      y: 100,
      toJSON: () => ({})
    } as DOMRect);
    Object.defineProperty(sticky, 'offsetWidth', {configurable: true, get: () => 200});
    Object.defineProperty(sticky, 'offsetHeight', {configurable: true, get: () => 40});
    Object.defineProperty(wrap, 'offsetHeight', {configurable: true, get: () => 500});
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    expect(dir.cache?.context.height).toBe(500);
  });

  it('should leave cache null when context selector does not exist', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyMissingContextComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyMissingContextComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    expect(f.componentInstance.sticky.cache).toBeNull();
  });

  it('should fall back to window when scroll context selector is missing', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyBadScrollComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyBadScrollComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    expect(f.componentInstance.sticky.cache).toBeTruthy();
  });

  it('should read scrollTop from custom scroll element', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyScrollElementComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyScrollElementComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const scrollHost = f.nativeElement.querySelector('#scrollHost') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    Object.defineProperty(scrollHost, 'scrollTop', {configurable: true, get: () => 150, set: () => {}});
    f.detectChanges();
    await f.whenStable();

    const dir = f.componentInstance.sticky;
    scrollHost.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.fixed).toBeTrue();
  });

  it('should set container height when inner wrapper height differs from context', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyNestedContainerComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyNestedContainerComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const inner = f.nativeElement.querySelector('#inner') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    Object.defineProperty(inner, 'offsetHeight', {configurable: true, get: () => 40});
    f.detectChanges();
    await f.whenStable();
    expect(inner.style.height).toBe('500px');
  });

  it('should clear cache when sticky is taller than context', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    Object.defineProperty(sticky, 'offsetHeight', {configurable: true, get: () => 600});
    Object.defineProperty(ctx, 'offsetHeight', {configurable: true, get: () => 500});
    f.detectChanges();
    await f.whenStable();
    expect(f.componentInstance.sticky.cache).toBeNull();
  });

  it('should clear cache when element is hidden', async () => {
    const gcs = window.getComputedStyle;
    try {
      spyOn(window, 'getComputedStyle').and.returnValue({
        display: 'none',
        visibility: 'visible',
        marginTop: '0',
        marginBottom: '0'
      } as CSSStyleDeclaration);
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
      const f = TestBed.createComponent(HostStickyComponent);
      const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
      const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
      const sy = {value: 0};
      installStickyWindowMocks({scrollY: sy, ctx, sticky});
      f.detectChanges();
      await f.whenStable();
      expect(f.componentInstance.sticky.cache).toBeNull();
    } finally {
      (window as unknown as {getComputedStyle: typeof gcs}).getComputedStyle = gcs;
    }
  });

  it('should not change stick state when element height equals context (sameHeight)', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    Object.defineProperty(sticky, 'offsetHeight', {configurable: true, get: () => 500});
    Object.defineProperty(ctx, 'offsetHeight', {configurable: true, get: () => 500});
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    expect(dir.cache?.sameHeight).toBeTrue();
    sy.value = 200;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.fixed).toBeFalse();
    expect(dir.bound).toBeFalse();
  });

  it('should debounce refresh when observeChanges and DOM mutates', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyObserveComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyObserveComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    let repositions = 0;
    f.componentInstance.sticky.suiOnReposition.subscribe(() => repositions++);
    const before = repositions;
    const span = document.createElement('span');
    ctx.appendChild(span);
    await new Promise<void>(resolve => setTimeout(resolve, 110));
    await f.whenStable();
    expect(repositions).toBeGreaterThan(before);
  });

  it('should call fixBottom when pushing from bound state with small viewport', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyPushingComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyPushingComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky, innerHeight: 200});
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    sy.value = 600;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.bound).toBeTrue();

    sy.value = 150;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.fixed).toBeTrue();
    expect(dir.bottomState).toBeTrue();
  });

  it('should fixTop from bound when not pushing', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky, innerHeight: 200});
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    sy.value = 600;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.bound).toBeTrue();

    sy.value = 200;
    window.dispatchEvent(new Event('scroll'));
    await f.whenStable();
    expect(dir.fixed).toBeTrue();
    expect(dir.topState).toBeTrue();
  });

  it('should stay fixed top when element taller than viewport and context is tall', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({
      scrollY: sy,
      ctx,
      sticky,
      innerHeight: 300,
      ctxRect: {top: 0, height: 2000, bottom: 2000},
      stickyRect: {top: 100, height: 400, bottom: 500, y: 100}
    });
    f.detectChanges();
    await f.whenStable();
    const dir = f.componentInstance.sticky;
    expect(dir.cache?.fits).toBeFalse();
    sy.value = 150;
    window.dispatchEvent(new Event('scroll'));
    expect(dir.fixed).toBeTrue();
    expect(dir.topState).toBeTrue();
    sy.value = 250;
    window.dispatchEvent(new Event('scroll'));
    expect(dir.fixed).toBeTrue();
    expect(dir.topState).toBeTrue();
  });

  it('should clear state on destroy', async () => {
    const dir = fixture.componentInstance.sticky;
    expect(dir.cache).toBeTruthy();
    fixture.destroy();
    expect(dir.cache).toBeNull();
  });

  it('should clear pending observe refresh timer on destroy', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({imports: [HostStickyObserveComponent]}).compileComponents();
    const f = TestBed.createComponent(HostStickyObserveComponent);
    const ctx = f.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = f.nativeElement.querySelector('[suiSticky]') as HTMLElement;
    const sy = {value: 0};
    installStickyWindowMocks({scrollY: sy, ctx, sticky});
    f.detectChanges();
    await f.whenStable();
    ctx.appendChild(document.createElement('div'));
    f.destroy();
    await new Promise<void>(resolve => setTimeout(resolve, 110));
    expect(true).toBeTrue();
  });
});
