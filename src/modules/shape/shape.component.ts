/**
 * Semantic UI [Shape](https://semantic-ui.com/modules/shape.html) module — Angular port of the
 * jQuery `$.fn.shape` behavior (3D CSS transforms). Include Semantic UI’s shape CSS in your app.
 */

import {CommonModule} from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';
import {SuiShapeSideComponent} from './shape-side.component';

export type SuiShapeDimension = 'initial' | 'next' | number;
export type SuiShapeFlip =
  | 'flip up'
  | 'flip down'
  | 'flip left'
  | 'flip right'
  | 'flip over'
  | 'flip back';

function outerHeightWithMargins(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return rect.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
}

function outerWidthWithMargins(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return rect.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
}

function getTransitionEventName(): string {
  const el = document.createElement('div');
  const transitions: Record<string, string> = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };
  for (const key of Object.keys(transitions)) {
    if ((el.style as unknown as Record<string, string>)[key] !== undefined) {
      return transitions[key];
    }
  }
  return 'transitionend';
}

@Component({
  standalone: true,
  imports: [CommonModule, SuiShapeSideComponent],
  selector: 'sui-shape',
  exportAs: 'suiShape',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #shapeEl
      class="ui shape"
      [class.animating]="animating"
      [class.cube]="suiCube"
      [class.text]="suiText"
      [ngStyle]="shapeInlineStyle">
      <div #sidesEl class="sides" [ngStyle]="sidesInlineStyle">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class SuiShapeComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(SuiShapeSideComponent) private sideList!: QueryList<SuiShapeSideComponent>;
  @ViewChild('shapeEl', {static: true}) private shapeEl!: ElementRef<HTMLElement>;
  @ViewChild('sidesEl', {static: true}) private sidesEl!: ElementRef<HTMLElement>;

  /** Animation length in ms. `null` skips inline `transition-duration` (Semantic UI CSS defaults). */
  @Input() public suiDuration: number | null = null;
  /** Width during animation: initial size, next side’s size, or a fixed pixel width. */
  @Input() public suiWidth: SuiShapeDimension = 'initial';
  /** Height during animation: initial size, next side’s size, or a fixed pixel height. */
  @Input() public suiHeight: SuiShapeDimension = 'initial';
  /** Pixel fudge for 2D/3D rounding (matches Semantic UI `jitter`). */
  @Input() public suiJitter = 0;
  /** When false, flipping to the already-visible side is ignored. */
  @Input() @InputBoolean() public suiAllowRepeats = false;
  /** Adds the `cube` class (Semantic UI cube layout). */
  @Input() @InputBoolean() public suiCube = false;
  /** Adds the `text` class (Semantic UI text shape layout). */
  @Input() @InputBoolean() public suiText = false;

  @Output() public readonly suiBeforeChange = new EventEmitter<SuiShapeSideComponent>();
  @Output() public readonly suiOnChange = new EventEmitter<SuiShapeSideComponent>();

  public animating = false;
  public shapeInlineStyle: Record<string, string | null> = {};
  public sidesInlineStyle: Record<string, string | null> = {};

  private readonly transitionEnd = getTransitionEventName();
  private activeSide: SuiShapeSideComponent | null = null;
  private nextSide: SuiShapeSideComponent | null = null;
  private manualNextIndex: number | null = null;
  private readonly queue: SuiShapeFlip[] = [];
  private sidesChangeSub: { unsubscribe(): void } | null = null;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  public ngAfterContentInit(): void {
    this.ensureFirstSideActive();
    this.setDefaultSide();
    this.applyDurationToSides();
    this.sidesChangeSub = this.sideList.changes.subscribe(() => {
      this.ensureFirstSideActive();
      this.setDefaultSide();
      this.applyDurationToSides();
      this.cdr.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.sidesChangeSub?.unsubscribe();
  }

  /** Mirrors `shape('flip up')`. */
  public flipUp(): void {
    this.runFlip('flip up', () => {
      this.setStageSize();
      this.stageAbove();
      this.animate(this.getTransformUp());
    });
  }

  /** Mirrors `shape('flip down')`. */
  public flipDown(): void {
    this.runFlip('flip down', () => {
      this.setStageSize();
      this.stageBelow();
      this.animate(this.getTransformDown());
    });
  }

  /** Mirrors `shape('flip left')`. */
  public flipLeft(): void {
    this.runFlip('flip left', () => {
      this.setStageSize();
      this.stageLeft();
      this.animate(this.getTransformLeft());
    });
  }

  /** Mirrors `shape('flip right')`. */
  public flipRight(): void {
    this.runFlip('flip right', () => {
      this.setStageSize();
      this.stageRight();
      this.animate(this.getTransformRight());
    });
  }

  /** Mirrors `shape('flip over')`. */
  public flipOver(): void {
    this.runFlip('flip over', () => {
      this.setStageSize();
      this.stageBehind();
      this.animate(this.getTransformOver());
    });
  }

  /** Mirrors `shape('flip back')`. */
  public flipBack(): void {
    this.runFlip('flip back', () => {
      this.setStageSize();
      this.stageBehind();
      this.animate(this.getTransformBack());
    });
  }

  /**
   * Mirrors `shape('set next side', selector)` — `selector` is evaluated against the shape root
   * (each projected `.side` element).
   */
  public setNextSide(selector: string): void {
    const sides = this.sideList.toArray();
    const matched = sides.filter((s) => s.nativeElement.matches(selector));
    if (matched.length === 0) {
      this.setDefaultSide();
      return;
    }
    this.nextSide = matched[0];
    this.manualNextIndex = sides.indexOf(this.nextSide);
  }

  /** Mirrors `shape('is animating')`. */
  public isAnimating(): boolean {
    return this.animating;
  }

  /** Mirrors `shape('reset')` — clears inline animation styles. */
  public reset(): void {
    this.animating = false;
    this.shapeInlineStyle = {};
    this.sidesInlineStyle = {};
    for (const side of this.sideList.toArray()) {
      side.styleHidden = false;
      side.styleAnimating = false;
      side.clearInlineStyles();
    }
    this.cdr.markForCheck();
  }

  /** Mirrors `shape('repaint')` — forces layout. */
  public repaint(): void {
    const el = this.sidesEl?.nativeElement;
    if (el) {
      void el.offsetWidth;
    }
  }

  /** Mirrors `shape('refresh')` — re-syncs cached side references. */
  public refresh(): void {
    this.setDefaultSide();
  }

  /** Dispatches a named flip (useful when mirroring jQuery string APIs). */
  public flip(behavior: SuiShapeFlip): void {
    switch (behavior) {
      case 'flip up':
        this.flipUp();
        break;
      case 'flip down':
        this.flipDown();
        break;
      case 'flip left':
        this.flipLeft();
        break;
      case 'flip right':
        this.flipRight();
        break;
      case 'flip over':
        this.flipOver();
        break;
      case 'flip back':
        this.flipBack();
        break;
    }
  }

  private runFlip(name: SuiShapeFlip, run: () => void): void {
    if (this.sideList.length < 2) {
      return;
    }
    this.setDefaultSide();
    if (!this.activeSide || !this.nextSide) {
      return;
    }
    if (this.isComplete() && !this.animating && !this.suiAllowRepeats) {
      return;
    }
    if (!this.animating) {
      run();
    } else {
      this.queue.push(name);
    }
  }

  private isComplete(): boolean {
    return this.activeSide !== null && this.nextSide !== null && this.activeSide === this.nextSide;
  }

  private ensureFirstSideActive(): void {
    const sides = this.sideList.toArray();
    if (sides.length === 0) {
      return;
    }
    if (!sides.some((s) => s.styleActive)) {
      sides[0].styleActive = true;
    }
  }

  private setDefaultSide(): void {
    const sides = this.sideList.toArray();
    if (sides.length === 0) {
      this.activeSide = null;
      this.nextSide = null;
      return;
    }
    const activeIdx = sides.findIndex((s) => s.styleActive);
    this.activeSide = activeIdx >= 0 ? sides[activeIdx] : sides[0];
    if (this.manualNextIndex !== null && this.manualNextIndex >= 0 && this.manualNextIndex < sides.length) {
      this.nextSide = sides[this.manualNextIndex];
    } else {
      const idx = sides.indexOf(this.activeSide);
      this.nextSide = idx < sides.length - 1 ? sides[idx + 1] : sides[0];
    }
  }

  private applyDurationToSides(): void {
    if (this.suiDuration === null || this.suiDuration === undefined) {
      return;
    }
    const d = `${this.suiDuration}ms`;
    const style = {
      transitionDuration: d,
      WebkitTransitionDuration: d,
      MozTransitionDuration: d,
      OTransitionDuration: d
    };
    this.sidesInlineStyle = {...this.sidesInlineStyle, ...style};
    for (const side of this.sideList.toArray()) {
      side.inlineStyles = {...side.inlineStyles, ...style};
    }
  }

  private setStageSize(): void {
    if (!this.activeSide || !this.nextSide) {
      return;
    }
    const shape = this.shapeEl.nativeElement;
    const wMode = this.suiWidth;
    const hMode = this.suiHeight;
    let newWidth: number;
    let newHeight: number;
    if (wMode === 'next') {
      newWidth = outerWidthWithMargins(this.nextSide.nativeElement);
    } else if (wMode === 'initial') {
      newWidth = shape.offsetWidth;
    } else {
      newWidth = wMode;
    }
    if (hMode === 'next') {
      newHeight = outerHeightWithMargins(this.nextSide.nativeElement);
    } else if (hMode === 'initial') {
      newHeight = shape.offsetHeight;
    } else {
      newHeight = hMode;
    }
    this.shapeInlineStyle = {
      ...this.shapeInlineStyle,
      width: `${newWidth + this.suiJitter}px`,
      height: `${newHeight + this.suiJitter}px`
    };
  }

  private animate(finalSidesTransform: Record<string, string>): void {
    if (!this.activeSide || !this.nextSide) {
      return;
    }
    const $active = this.activeSide;
    const $next = this.nextSide;
    this.suiBeforeChange.emit($next);

    const sidesEl = this.sidesEl.nativeElement;
    const onEnd = () => {
      this.zone.run(() => {
        this.finishAnimation();
      });
    };

    this.animating = true;
    sidesEl.addEventListener(this.transitionEnd, onEnd, {once: true});
    this.sidesInlineStyle = {...this.sidesInlineStyle, ...finalSidesTransform};

    requestAnimationFrame(() => {
      $active.styleHidden = true;
      this.cdr.markForCheck();
    });
  }

  private finishAnimation(): void {
    this.reset();
    this.setActive();
    this.processQueue();
    this.cdr.markForCheck();
  }

  private setActive(): void {
    const sides = this.sideList.toArray();
    if (!this.nextSide) {
      return;
    }
    for (const s of sides) {
      s.styleActive = false;
    }
    this.nextSide.styleActive = true;
    this.suiOnChange.emit(this.nextSide);
    this.manualNextIndex = null;
    this.setDefaultSide();
  }

  private processQueue(): void {
    const next = this.queue.shift();
    if (next) {
      this.flip(next);
    }
  }

  private getTransformUp(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateY = -(outerHeightWithMargins($a) - outerHeightWithMargins($n)) / 2;
    const translateZ = -outerHeightWithMargins($a) / 2;
    return {
      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(-90deg)`
    };
  }

  private getTransformDown(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateY = -(outerHeightWithMargins($a) - outerHeightWithMargins($n)) / 2;
    const translateZ = -outerHeightWithMargins($a) / 2;
    return {
      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(90deg)`
    };
  }

  private getTransformLeft(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateX = -(outerWidthWithMargins($a) - outerWidthWithMargins($n)) / 2;
    const translateZ = -outerWidthWithMargins($a) / 2;
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(90deg)`
    };
  }

  private getTransformRight(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateX = -(outerWidthWithMargins($a) - outerWidthWithMargins($n)) / 2;
    const translateZ = -outerWidthWithMargins($a) / 2;
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(-90deg)`
    };
  }

  private getTransformOver(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateX = -(outerWidthWithMargins($a) - outerWidthWithMargins($n)) / 2;
    return {
      transform: `translateX(${translateX}px) rotateY(180deg)`
    };
  }

  private getTransformBack(): Record<string, string> {
    const $a = this.activeSide!.nativeElement;
    const $n = this.nextSide!.nativeElement;
    const translateX = -(outerWidthWithMargins($a) - outerWidthWithMargins($n)) / 2;
    return {
      transform: `translateX(${translateX}px) rotateY(-180deg)`
    };
  }

  private stageAbove(): void {
    const $a = this.activeSide!;
    const $n = this.nextSide!;
    const ah = outerHeightWithMargins($a.nativeElement);
    const nh = outerHeightWithMargins($n.nativeElement);
    const origin = (ah - nh) / 2;
    const depthActive = nh / 2;
    const depthNext = ah / 2;

    this.sidesInlineStyle = {
      ...this.sidesInlineStyle,
      transform: `translateZ(-${depthActive}px)`
    };
    $a.inlineStyles = {
      ...$a.inlineStyles,
      transform: `rotateY(0deg) translateZ(${depthActive}px)`
    };
    $n.styleAnimating = true;
    $n.inlineStyles = {
      ...$n.inlineStyles,
      top: `${origin}px`,
      transform: `rotateX(90deg) translateZ(${depthNext}px)`
    };
  }

  private stageBelow(): void {
    const $a = this.activeSide!;
    const $n = this.nextSide!;
    const ah = outerHeightWithMargins($a.nativeElement);
    const nh = outerHeightWithMargins($n.nativeElement);
    const origin = (ah - nh) / 2;
    const depthActive = nh / 2;
    const depthNext = ah / 2;

    this.sidesInlineStyle = {
      ...this.sidesInlineStyle,
      transform: `translateZ(-${depthActive}px)`
    };
    $a.inlineStyles = {
      ...$a.inlineStyles,
      transform: `rotateY(0deg) translateZ(${depthActive}px)`
    };
    $n.styleAnimating = true;
    $n.inlineStyles = {
      ...$n.inlineStyles,
      top: `${origin}px`,
      transform: `rotateX(-90deg) translateZ(${depthNext}px)`
    };
  }

  private stageLeft(): void {
    const $a = this.activeSide!;
    const $n = this.nextSide!;
    const wa = outerWidthWithMargins($a.nativeElement);
    const wn = outerWidthWithMargins($n.nativeElement);
    const origin = (wa - wn) / 2;
    const depthActive = wn / 2;
    const depthNext = wa / 2;

    this.sidesInlineStyle = {
      ...this.sidesInlineStyle,
      transform: `translateZ(-${depthActive}px)`
    };
    $a.inlineStyles = {
      ...$a.inlineStyles,
      transform: `rotateY(0deg) translateZ(${depthActive}px)`
    };
    $n.styleAnimating = true;
    $n.inlineStyles = {
      ...$n.inlineStyles,
      left: `${origin}px`,
      transform: `rotateY(-90deg) translateZ(${depthNext}px)`
    };
  }

  private stageRight(): void {
    const $a = this.activeSide!;
    const $n = this.nextSide!;
    const wa = outerWidthWithMargins($a.nativeElement);
    const wn = outerWidthWithMargins($n.nativeElement);
    const origin = (wa - wn) / 2;
    const depthActive = wn / 2;
    const depthNext = wa / 2;

    this.sidesInlineStyle = {
      ...this.sidesInlineStyle,
      transform: `translateZ(-${depthActive}px)`
    };
    $a.inlineStyles = {
      ...$a.inlineStyles,
      transform: `rotateY(0deg) translateZ(${depthActive}px)`
    };
    $n.styleAnimating = true;
    $n.inlineStyles = {
      ...$n.inlineStyles,
      left: `${origin}px`,
      transform: `rotateY(90deg) translateZ(${depthNext}px)`
    };
  }

  private stageBehind(): void {
    const $a = this.activeSide!;
    const $n = this.nextSide!;
    const wa = outerWidthWithMargins($a.nativeElement);
    const wn = outerWidthWithMargins($n.nativeElement);
    const origin = (wa - wn) / 2;

    $a.inlineStyles = {
      ...$a.inlineStyles,
      transform: 'rotateY(0deg)'
    };
    $n.styleAnimating = true;
    $n.inlineStyles = {
      ...$n.inlineStyles,
      left: `${origin}px`,
      transform: 'rotateY(-180deg)'
    };
  }
}
