/**
 * Semantic UI [Sticky](https://semantic-ui.com/modules/sticky.html) — Angular port of `$.fn.sticky`.
 * Add `suiSticky` to the element that should stick; set `suiContext` to a selector or element for bounds.
 * Requires Semantic UI sticky CSS (and typically `position: relative` on the rail/column container).
 */

import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';
import {Subject, fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/** Cached layout (see Semantic UI `save.positions`). */
export interface SuiStickyCache {
  fits: boolean;
  sameHeight: boolean;
  scrollContext: {height: number};
  element: {
    margin: {top: number; bottom: number};
    top: number;
    left: number;
    width: number;
    height: number;
    bottom: number;
  };
  context: {
    top: number;
    height: number;
    bottom: number;
  };
}

@Directive({
  standalone: true,
  selector: '[suiSticky]',
  exportAs: 'suiSticky'
})
export class SuiStickyDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() public suiContext: string | HTMLElement | null = null;
  @Input() public suiScrollContext: 'window' | string = 'window';
  @Input() public suiOffset = 0;
  @Input() public suiBottomOffset = 0;
  @Input() @InputBoolean() public suiPushing = false;
  @Input() @InputBoolean() public suiSetSize = true;
  @Input() public suiJitter = 5;
  @Input() @InputBoolean() public suiObserveChanges = false;

  @Output() public readonly suiOnReposition = new EventEmitter<void>();
  @Output() public readonly suiOnScroll = new EventEmitter<void>();
  @Output() public readonly suiOnStick = new EventEmitter<void>();
  @Output() public readonly suiOnUnstick = new EventEmitter<void>();
  @Output() public readonly suiOnTop = new EventEmitter<void>();
  @Output() public readonly suiOnBottom = new EventEmitter<void>();

  public cache: SuiStickyCache | null = null;

  @HostBinding('class.ui') protected readonly classUi = true;
  @HostBinding('class.sticky') protected readonly classSticky = true;
  @HostBinding('class.fixed') fixed = false;
  @HostBinding('class.bound') bound = false;
  @HostBinding('class.top') topState = false;
  @HostBinding('class.bottom') bottomState = false;

  private readonly destroy$ = new Subject<void>();
  private lastScroll?: number;
  private elementScroll = 0;
  private scrollEl: Window | HTMLElement = window;
  private contextEl: HTMLElement | null = null;
  private containerEl: HTMLElement | null = null;
  private mutationObserver: MutationObserver | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly zone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.scrollEl = this.resolveScrollElement();
    const win = this.document.defaultView!;
    this.zone.runOutsideAngular(() => {
      const scrollTarget = this.scrollEl === window ? win : this.scrollEl;
      fromEvent(scrollTarget, 'scroll', {passive: true})
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          requestAnimationFrame(() => {
            const top = this.readScrollTop();
            this.zone.run(() => {
              this.stick(top);
              this.suiOnScroll.emit();
            });
          });
        });
      fromEvent(win, 'resize', {passive: true})
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          requestAnimationFrame(() => this.zone.run(() => this.refresh(false)));
        });
    });
  }

  public ngAfterViewInit(): void {
    queueMicrotask(() => this.refresh(true));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.mutationObserver?.disconnect();
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.reset();
  }

  /** Mirrors `sticky('refresh')`. */
  public refresh(hardRefresh = false): void {
    this.resetLayout();
    this.determineContainer();
    this.determineContext();
    if (!this.contextEl) {
      return;
    }
    if (hardRefresh) {
      this.determineContainer();
    }
    this.savePositions();
    this.suiOnReposition.emit();
    this.cdr.markForCheck();
    if (this.suiObserveChanges && typeof MutationObserver !== 'undefined' && !this.mutationObserver) {
      this.mutationObserver = new MutationObserver(() => this.scheduleRefresh());
      this.mutationObserver.observe(this.contextEl, {childList: true, subtree: true});
      this.mutationObserver.observe(this.el.nativeElement, {childList: true, subtree: true});
    }
  }

  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.refreshTimer = setTimeout(() => {
      this.refreshTimer = null;
      this.refresh(false);
    }, 100);
  }

  private resolveScrollElement(): Window | HTMLElement {
    if (this.suiScrollContext === 'window') {
      return window;
    }
    const found = this.document.querySelector(this.suiScrollContext);
    return (found as HTMLElement) || window;
  }

  private readScrollTop(): number {
    return this.scrollEl === window ? window.scrollY : (this.scrollEl as HTMLElement).scrollTop;
  }

  private determineContainer(): void {
    const host = this.el.nativeElement;
    this.containerEl = (host.offsetParent as HTMLElement) || host.parentElement;
  }

  private determineContext(): void {
    if (this.suiContext === null) {
      this.contextEl = this.containerEl;
      return;
    }
    if (typeof this.suiContext === 'string') {
      this.contextEl = this.document.querySelector(this.suiContext) as HTMLElement | null;
      return;
    }
    this.contextEl = this.suiContext;
  }

  private savePositions(): void {
    const mod = this.el.nativeElement;
    const ctx = this.contextEl!;
    const scrollH = window.innerHeight;

    const cs = getComputedStyle(mod);
    const marginTop = parseInt(cs.marginTop, 10) || 0;
    const marginBottom = parseInt(cs.marginBottom, 10) || 0;

    const sy = window.scrollY;
    const sx = window.scrollX;
    const er = mod.getBoundingClientRect();
    const cr = ctx.getBoundingClientRect();

    const elementOffsetTop = er.top + sy;
    const contextOffsetTop = cr.top + sy;
    const elementOffsetLeft = er.left + sx;

    const elementHeight = mod.offsetHeight;
    const contextHeight = ctx.offsetHeight;

    const elementTop = elementOffsetTop - marginTop;
    const contextBottom = contextOffsetTop + contextHeight;

    this.cache = {
      fits: elementHeight + this.suiOffset <= scrollH,
      sameHeight: elementHeight === contextHeight,
      scrollContext: {height: scrollH},
      element: {
        margin: {top: marginTop, bottom: marginBottom},
        top: elementTop,
        left: elementOffsetLeft,
        width: mod.offsetWidth,
        height: elementHeight,
        bottom: elementOffsetTop + elementHeight
      },
      context: {
        top: contextOffsetTop,
        height: contextHeight,
        bottom: contextBottom
      }
    };

    this.setContainerSize();
    if (!this.isCacheValid()) {
      this.cache = null;
      this.resetLayout();
      return;
    }
    this.stick(this.readScrollTop());
  }

  private isCacheValid(): boolean {
    if (!this.cache) {
      return false;
    }
    const style = getComputedStyle(this.el.nativeElement);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }
    return this.cache.element.height <= this.cache.context.height;
  }

  private setContainerSize(): void {
    if (!this.cache || !this.containerEl) {
      return;
    }
    const tag = this.containerEl.tagName;
    if (tag === 'HTML' || tag === 'BODY') {
      return;
    }
    const ch = this.containerEl.offsetHeight;
    const ctxH = this.cache.context.height;
    if (Math.abs(ch - ctxH) > this.suiJitter) {
      this.renderer.setStyle(this.containerEl, 'height', `${ctxH}px`);
    }
  }

  /**
   * Port of Semantic UI `module.stick` — initial / fixed-top / bound-bottom transitions
   * (simplified: no oversized inner scroll in this version).
   */
  private stick(cachedPosition: number): void {
    const cache = this.cache;
    if (!cache || cache.sameHeight) {
      return;
    }

    const offset = this.bottomState && this.suiPushing ? this.suiBottomOffset : this.suiOffset;
    const scroll = {
      top: cachedPosition + offset,
      bottom: cachedPosition + offset + cache.scrollContext.height
    };

    const element = cache.element;
    const context = cache.context;
    const elementScroll = cache.fits ? 0 : this.computeElementScroll(cachedPosition);

    if (this.isInitialPosition()) {
      if (scroll.top >= context.bottom) {
        this.bindBottom();
      } else if (scroll.top > element.top) {
        if (element.height + scroll.top - elementScroll >= context.bottom) {
          this.bindBottom();
        } else {
          this.fixTop();
        }
      }
    } else if (this.fixed) {
      if (this.topState) {
        if (scroll.top <= element.top) {
          this.setInitialPosition();
        } else if (element.height + scroll.top - elementScroll >= context.bottom) {
          this.bindBottom();
        } else if (!cache.fits) {
          this.applyElementScroll(elementScroll);
          this.lastScroll = scroll.top;
        }
      } else if (this.bottomState) {
        if (scroll.bottom - element.height <= element.top) {
          this.setInitialPosition();
        } else if (scroll.bottom >= context.bottom) {
          this.bindBottom();
        } else if (!cache.fits) {
          this.applyElementScroll(elementScroll);
          this.lastScroll = scroll.top;
        }
      }
    } else if (this.bound && this.bottomState) {
      if (scroll.top <= element.top) {
        this.setInitialPosition();
      } else if (this.suiPushing) {
        if (this.bound && scroll.bottom <= context.bottom) {
          this.fixBottom();
        }
      } else {
        if (this.bound && scroll.top <= context.bottom - element.height) {
          this.fixTop();
        }
      }
    }

    this.lastScroll = cachedPosition;
    this.cdr.markForCheck();
  }

  private isInitialPosition(): boolean {
    return !this.fixed && !this.bound;
  }

  private computeElementScroll(scroll: number): number {
    const cache = this.cache!;
    const delta = this.lastScroll === undefined ? 0 : scroll - this.lastScroll;
    const maxScroll = cache.element.height - cache.scrollContext.height + this.suiOffset;
    let es = this.elementScroll;
    if (this.topState) {
      es = Math.abs(parseInt(this.el.nativeElement.style.top || '0', 10)) || 0;
    } else if (this.bottomState) {
      es = Math.abs(parseInt(this.el.nativeElement.style.bottom || '0', 10)) || 0;
    }
    const possible = es + delta;
    if (cache.fits || possible < 0) {
      return 0;
    }
    if (possible > maxScroll) {
      return maxScroll;
    }
    return possible;
  }

  private applyElementScroll(scroll: number): void {
    this.elementScroll = scroll;
    if (this.topState) {
      this.renderer.setStyle(this.el.nativeElement, 'bottom', '');
      this.renderer.setStyle(this.el.nativeElement, 'top', `${-scroll}px`);
    }
    if (this.bottomState) {
      this.renderer.setStyle(this.el.nativeElement, 'top', '');
      this.renderer.setStyle(this.el.nativeElement, 'bottom', `${scroll}px`);
    }
  }

  private bindBottom(): void {
    this.unfix();
    this.unbind();
    this.clearPositionStyles();
    this.renderer.removeStyle(this.el.nativeElement, 'margin-top');
    this.fixed = false;
    this.bound = true;
    this.topState = false;
    this.bottomState = true;
    this.suiOnBottom.emit();
    this.suiOnUnstick.emit();
  }

  private fixTop(): void {
    this.unfix();
    this.unbind();
    const cache = this.cache!;
    if (this.suiSetSize) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${cache.element.width}px`, 2);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${cache.element.height}px`, 2);
    }
    if (this.containerEl) {
      this.renderer.setStyle(this.containerEl, 'min-height', `${cache.element.height}px`);
    }
    this.renderer.setStyle(this.el.nativeElement, 'margin-top', `${this.suiOffset}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${cache.element.left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'bottom', '');
    this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', '');
    this.fixed = true;
    this.bound = false;
    this.topState = true;
    this.bottomState = false;
    this.suiOnStick.emit();
  }

  private fixBottom(): void {
    this.unfix();
    this.unbind();
    const cache = this.cache!;
    if (this.suiSetSize) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${cache.element.width}px`, 2);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${cache.element.height}px`, 2);
    }
    if (this.containerEl) {
      this.renderer.setStyle(this.containerEl, 'min-height', `${cache.element.height}px`);
    }
    this.renderer.setStyle(this.el.nativeElement, 'margin-top', `${this.suiOffset}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${cache.element.left}px`);
    this.fixed = true;
    this.bound = false;
    this.topState = false;
    this.bottomState = true;
    this.suiOnStick.emit();
  }

  private setInitialPosition(): void {
    const wasStuck = this.fixed || this.bound;
    this.unfix();
    this.unbind();
    this.lastScroll = undefined;
    this.elementScroll = 0;
    if (wasStuck) {
      this.suiOnUnstick.emit();
    }
  }

  private unbind(): void {
    if (!this.bound) {
      return;
    }
    this.bound = false;
    this.topState = false;
    this.bottomState = false;
  }

  private unfix(): void {
    if (!this.fixed) {
      return;
    }
    if (this.containerEl) {
      this.renderer.removeStyle(this.containerEl, 'min-height');
    }
    this.renderer.removeStyle(this.el.nativeElement, 'margin-top');
    this.renderer.removeStyle(this.el.nativeElement, 'left');
    this.renderer.removeStyle(this.el.nativeElement, 'width');
    this.renderer.removeStyle(this.el.nativeElement, 'height');
    this.renderer.removeStyle(this.el.nativeElement, 'top');
    this.renderer.removeStyle(this.el.nativeElement, 'bottom');
    this.fixed = false;
    this.topState = false;
    this.bottomState = false;
  }

  private clearPositionStyles(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'left');
    this.renderer.removeStyle(this.el.nativeElement, 'top');
    this.renderer.removeStyle(this.el.nativeElement, 'bottom');
    this.renderer.removeStyle(this.el.nativeElement, 'margin-bottom');
  }

  private resetLayout(): void {
    this.unfix();
    this.unbind();
    this.clearPositionStyles();
    this.renderer.removeStyle(this.el.nativeElement, 'margin-top');
    if (this.containerEl) {
      this.renderer.removeStyle(this.containerEl, 'height');
      this.renderer.removeStyle(this.containerEl, 'min-height');
    }
    this.renderer.removeStyle(this.el.nativeElement, 'width');
    this.renderer.removeStyle(this.el.nativeElement, 'height');
    this.fixed = false;
    this.bound = false;
    this.topState = false;
    this.bottomState = false;
  }

  private reset(): void {
    this.resetLayout();
    this.cache = null;
  }
}
