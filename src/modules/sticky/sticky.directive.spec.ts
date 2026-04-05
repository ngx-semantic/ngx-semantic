import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiStickyDirective} from './sticky.directive';

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

describe('SuiStickyDirective', () => {
  let fixture: ComponentFixture<HostStickyComponent>;
  let scrollYValue = 0;

  beforeEach(async () => {
    scrollYValue = 0;
    await TestBed.configureTestingModule({
      imports: [HostStickyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostStickyComponent);
    const ctx = fixture.nativeElement.querySelector('#ctx') as HTMLElement;
    const sticky = fixture.nativeElement.querySelector('[suiSticky]') as HTMLElement;

    spyOnProperty(window, 'scrollX', 'get').and.returnValue(0);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(window, 'scrollY', 'get').and.callFake(() => scrollYValue);

    spyOn(ctx, 'getBoundingClientRect').and.returnValue({
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
    Object.defineProperty(ctx, 'offsetHeight', {configurable: true, get: () => 500});

    // Scroll handler defers to requestAnimationFrame; flush it synchronously in tests.
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

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

  it('should fix to viewport when scroll passes element top', fakeAsync(() => {
    const dir = fixture.componentInstance.sticky;
    let stuck = 0;
    dir.suiOnStick.subscribe(() => stuck++);

    scrollYValue = 150;
    window.dispatchEvent(new Event('scroll'));
    tick();
    fixture.detectChanges();

    expect(dir.fixed).toBeTrue();
    expect(dir.topState).toBeTrue();
    expect(stuck).toBe(1);
  }));

  it('should bind to bottom when scroll reaches context end', fakeAsync(() => {
    const dir = fixture.componentInstance.sticky;

    scrollYValue = 600;
    window.dispatchEvent(new Event('scroll'));
    tick();
    fixture.detectChanges();

    expect(dir.bound).toBeTrue();
    expect(dir.bottomState).toBeTrue();
  }));
});
