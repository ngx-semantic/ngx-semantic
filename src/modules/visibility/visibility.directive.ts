/**
 * Semantic UI [Visibility](https://semantic-ui.com/behaviors/visibility.html) — Angular port of `$.fn.visibility`.
 * Add `suiVisibility` to any element to receive viewport/scroll callbacks.
 */

import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2, inject } from '@angular/core';
import { InputBoolean } from 'ngx-semantic/core/util';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  computeVisibilityCalculations,
  passedAmounts,
  passedThresholdPixels,
  shouldEmitCondition,
  shouldEmitReverse
} from './visibility-util';
import { SuiVisibilityCalculations, SuiVisibilityPassedConfig, SuiVisibilityPassedEvent, SuiVisibilityType } from './visibility.types';

const CONDITION_KEYS = ['onScreen', 'offScreen', 'topVisible', 'topPassed', 'bottomVisible', 'bottomPassed', 'passing'] as const;

type ConditionKey = typeof CONDITION_KEYS[number];

const REVERSE_KEYS: Partial<Record<ConditionKey, string>> = {
  topVisible: 'topVisibleReverse',
  topPassed: 'topPassedReverse',
  bottomVisible: 'bottomVisibleReverse',
  bottomPassed: 'bottomPassedReverse',
  passing: 'passingReverse'
};

@Directive({
  standalone: true,
  selector: '[suiVisibility]',
  exportAs: 'suiVisibility'
})
export class SuiVisibilityDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);

  /** Semantic UI `once` — each condition fires once until `refresh()`. */
  @Input() @InputBoolean() public suiOnce = true;
  /** Fire on every check while the condition holds. */
  @Input() @InputBoolean() public suiContinuous = false;
  /** Scroll context (`window`, selector, or element). */
  @Input() public suiContext: 'window' | string | HTMLElement | null = 'window';
  /** Alias of `suiContext` (sticky-style). Takes precedence when set. */
  @Input() public suiScrollContext: 'window' | string | HTMLElement | null = null;
  @Input() public suiOffset = 0;
  @Input() @InputBoolean() public suiIncludeMargin = false;
  @Input() @InputBoolean() public suiInitialCheck = true;
  @Input() @InputBoolean() public suiObserveChanges = false;
  /** Milliseconds to throttle scroll checks; `false` uses `requestAnimationFrame`. */
  @Input() public suiThrottle: number | false = false;
  @Input() public suiType: SuiVisibilityType = false;
  @Input() public suiPassed: SuiVisibilityPassedConfig | null = null;
  @Input() public suiZIndex = 1;

  @Output() public readonly suiOnOnScreen = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnOffScreen = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnTopVisible = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnTopPassed = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnBottomVisible = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnBottomPassed = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnPassing = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnTopVisibleReverse = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnTopPassedReverse = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnBottomVisibleReverse = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnBottomPassedReverse = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnPassingReverse = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnUpdate = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnPassed = new EventEmitter<SuiVisibilityPassedEvent>();
  @Output() public readonly suiOnRefresh = new EventEmitter<void>();
  @Output() public readonly suiOnFixed = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnUnfixed = new EventEmitter<SuiVisibilityCalculations>();
  @Output() public readonly suiOnLoad = new EventEmitter<SuiVisibilityCalculations>();

  public lastCalculations: SuiVisibilityCalculations | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly occurred: Record<string, boolean> = {};
  private readonly previous: Record<string, boolean> = {};
  private scrollEl: Window | HTMLElement = window;
  private lastScrollTop = 0;
  private disabled = false;
  private mutationObserver: MutationObserver | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private throttleTimer: ReturnType<typeof setTimeout> | null = null;
  private rafId: number | null = null;
  private imageLoaded = false;
  private isFixed = false;
  private placeholder: HTMLElement | null = null;

  private readonly emitters: Record<string, EventEmitter<SuiVisibilityCalculations>> = {
    onScreen: this.suiOnOnScreen,
    offScreen: this.suiOnOffScreen,
    topVisible: this.suiOnTopVisible,
    topPassed: this.suiOnTopPassed,
    bottomVisible: this.suiOnBottomVisible,
    bottomPassed: this.suiOnBottomPassed,
    passing: this.suiOnPassing,
    topVisibleReverse: this.suiOnTopVisibleReverse,
    topPassedReverse: this.suiOnTopPassedReverse,
    bottomVisibleReverse: this.suiOnBottomVisibleReverse,
    bottomPassedReverse: this.suiOnBottomPassedReverse,
    passingReverse: this.suiOnPassingReverse
  };

  public ngOnInit(): void {
    this.bindListeners();
  }

  public ngAfterViewInit(): void {
    if (this.suiObserveChanges && typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => this.scheduleRefresh());
      this.mutationObserver.observe(this.el.nativeElement, { childList: true, subtree: true, attributes: true });
    }
    if (this.suiInitialCheck) {
      queueMicrotask(() => this.check());
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.mutationObserver?.disconnect();
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    if (this.throttleTimer) {
      clearTimeout(this.throttleTimer);
    }
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
    }
    this.removePlaceholder();
  }

  /** Mirrors `visibility('refresh')` — clears occurred flags and rechecks. */
  public refresh(): void {
    Object.keys(this.occurred).forEach((key) => {
      delete this.occurred[key];
    });
    Object.keys(this.previous).forEach((key) => {
      delete this.previous[key];
    });
    this.suiOnRefresh.emit();
    this.check();
  }

  public disable(): void {
    this.disabled = true;
  }

  public enable(): void {
    this.disabled = false;
    this.check();
  }

  /** Mirrors `visibility('check')`. */
  public check(): void {
    if (this.disabled) {
      return;
    }
    this.scrollEl = this.resolveScrollElement();
    const calculations = this.readCalculations();
    this.lastCalculations = calculations;
    this.suiOnUpdate.emit(calculations);
    this.emitConditions(calculations);
    this.emitPassed(calculations);
    this.applyImageType(calculations);
    this.applyFixedType(calculations);
  }

  private bindListeners(): void {
    const win = this.document.defaultView!;
    this.scrollEl = this.resolveScrollElement();
    this.zone.runOutsideAngular(() => {
      const scrollTarget = this.scrollEl === window ? win : this.scrollEl;
      fromEvent(scrollTarget, 'scroll', { passive: true })
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.scheduleCheck());
      fromEvent(win, 'resize', { passive: true })
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.scheduleCheck());
    });
  }

  private scheduleCheck(): void {
    if (this.disabled) {
      return;
    }
    if (typeof this.suiThrottle === 'number' && this.suiThrottle > 0) {
      if (this.throttleTimer != null) {
        clearTimeout(this.throttleTimer);
      }
      this.throttleTimer = setTimeout(() => {
        this.throttleTimer = null;
        this.zone.run(() => this.check());
      }, this.suiThrottle);
      return;
    }
    if (this.rafId != null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.zone.run(() => this.check());
    });
  }

  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.refreshTimer = setTimeout(() => {
      this.refreshTimer = null;
      this.refresh();
    }, 100);
  }

  private resolveScrollElement(): Window | HTMLElement {
    const ctx = this.suiScrollContext ?? this.suiContext;
    if (!ctx || ctx === 'window') {
      return window;
    }
    if (typeof ctx !== 'string') {
      return ctx;
    }
    const found = this.document.querySelector(ctx);
    return (found as HTMLElement) || window;
  }

  private readScrollTop(): number {
    return this.scrollEl === window ? window.scrollY : (this.scrollEl as HTMLElement).scrollTop;
  }

  private readCalculations(): SuiVisibilityCalculations {
    const host = this.el.nativeElement;
    const elRect = host.getBoundingClientRect();
    const cs = getComputedStyle(host);
    const marginTop = parseFloat(cs.marginTop) || 0;
    const marginBottom = parseFloat(cs.marginBottom) || 0;
    const scrollTop = this.readScrollTop();
    const screen = this.scrollEl === window
      ? { top: 0, height: window.innerHeight }
      : (() => {
        const r = (this.scrollEl as HTMLElement).getBoundingClientRect();
        return { top: r.top, height: r.height };
      })();

    const calculations = computeVisibilityCalculations({
      element: { top: elRect.top, bottom: elRect.bottom, width: elRect.width, height: elRect.height },
      screen,
      offset: this.suiOffset,
      includeMargin: this.suiIncludeMargin,
      marginTop,
      marginBottom,
      lastScrollTop: this.lastScrollTop,
      scrollTop
    });
    this.lastScrollTop = scrollTop;
    return calculations;
  }

  private emitConditions(calculations: SuiVisibilityCalculations): void {
    for (const key of CONDITION_KEYS) {
      const current = calculations[key];
      const previous = !!this.previous[key];
      const reverseKey = REVERSE_KEYS[key];
      if (shouldEmitCondition(current, previous, !!this.occurred[key], this.suiOnce, this.suiContinuous)) {
        this.emitters[key].emit(calculations);
      }
      if (reverseKey && shouldEmitReverse(
        current,
        previous,
        !!this.occurred[key],
        !!this.occurred[reverseKey],
        this.suiOnce,
        this.suiContinuous
      )) {
        this.emitters[reverseKey].emit(calculations);
        this.occurred[reverseKey] = true;
      }
      if (current) {
        this.occurred[key] = true;
        if (!this.suiOnce && reverseKey) {
          this.occurred[reverseKey] = false;
        }
      } else if (!this.suiOnce) {
        this.occurred[key] = false;
      }
      this.previous[key] = current;
    }
  }

  private emitPassed(calculations: SuiVisibilityCalculations): void {
    if (!calculations.topPassed && !calculations.passing) {
      return;
    }
    for (const amount of passedAmounts(this.suiPassed)) {
      const px = passedThresholdPixels(amount, calculations.height);
      if (Number.isNaN(px) || calculations.pixelsPassed < px) {
        continue;
      }
      const occurredKey = `passed:${amount}`;
      const previous = !!this.previous[occurredKey];
      if (shouldEmitCondition(true, previous, !!this.occurred[occurredKey], this.suiOnce, this.suiContinuous)) {
        this.suiOnPassed.emit({ amount, calculations });
      }
      this.occurred[occurredKey] = true;
      this.previous[occurredKey] = true;
    }
  }

  private applyImageType(calculations: SuiVisibilityCalculations): void {
    if (this.suiType !== 'image' || this.imageLoaded || !calculations.topVisible) {
      return;
    }
    const host = this.el.nativeElement;
    const src = host.getAttribute('data-src');
    if (!src) {
      return;
    }
    this.renderer.setAttribute(host, 'src', src);
    this.renderer.removeAttribute(host, 'data-src');
    this.imageLoaded = true;
    this.suiOnLoad.emit(calculations);
  }

  private applyFixedType(calculations: SuiVisibilityCalculations): void {
    if (this.suiType !== 'fixed') {
      return;
    }
    if (calculations.topPassed) {
      this.fixElement(calculations);
    } else {
      this.unfixElement(calculations);
    }
  }

  private fixElement(calculations: SuiVisibilityCalculations): void {
    if (this.isFixed) {
      return;
    }
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const parent = host.parentNode;
    if (parent) {
      this.placeholder = this.renderer.createElement('div');
      this.renderer.setStyle(this.placeholder, 'display', 'block');
      this.renderer.setStyle(this.placeholder, 'width', `${rect.width}px`);
      this.renderer.setStyle(this.placeholder, 'height', `${rect.height}px`);
      this.renderer.insertBefore(parent, this.placeholder, host);
    }
    this.renderer.addClass(host, 'fixed');
    this.renderer.setStyle(host, 'position', 'fixed');
    this.renderer.setStyle(host, 'top', `${this.suiOffset}px`);
    this.renderer.setStyle(host, 'z-index', String(this.suiZIndex));
    this.isFixed = true;
    this.suiOnFixed.emit(calculations);
  }

  private unfixElement(calculations: SuiVisibilityCalculations): void {
    if (!this.isFixed) {
      return;
    }
    const host = this.el.nativeElement;
    this.renderer.removeClass(host, 'fixed');
    this.renderer.removeStyle(host, 'position');
    this.renderer.removeStyle(host, 'top');
    this.renderer.removeStyle(host, 'z-index');
    this.removePlaceholder();
    this.isFixed = false;
    this.suiOnUnfixed.emit(calculations);
  }

  private removePlaceholder(): void {
    if (!this.placeholder) {
      return;
    }
    const parent = this.placeholder.parentNode;
    if (parent) {
      this.renderer.removeChild(parent, this.placeholder);
    }
    this.placeholder = null;
  }
}
