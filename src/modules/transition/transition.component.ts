/**
 * Semantic UI [Transition](https://semantic-ui.com/modules/transition.html) — Angular port using
 * `@angular/animations` (`AnimationBuilder`). Include Semantic UI transition CSS in your app if you
 * rely on theme classes; motion is driven by this component’s animation metadata.
 */

import {
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import {
  buildEnterSteps,
  buildLeaveSteps,
  buildStaticSteps
} from './transition-animations';
import {
  durationToCss,
  isStaticTransitionName,
  parseTransitionName,
  resolveTransitionDirection,
  SuiTransitionDirectionMode
} from './transition-util';

@Component({
  standalone: true,
  selector: 'sui-transition',
  exportAs: 'suiTransition',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  host: {
    '[class]': 'hostClassList'
  }
})
export class SuiTransitionComponent implements OnChanges, OnDestroy {
  private readonly builder = inject(AnimationBuilder);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Semantic animation name, e.g. `fade up`, `horizontal flip`, `pulse`. Optional ` in` / ` out` suffix. */
  @Input() public suiAnimation = 'fade';
  /** Duration in ms or CSS time string (e.g. `500`, `500ms`, `0.5s`). */
  @Input() public suiDuration: number | string = 500;
  /** When not forced by the animation string, controls automatic in vs out (default mirrors Semantic `auto`). */
  @Input() public suiDirection: SuiTransitionDirectionMode = 'auto';
  /** Whether the host is shown (after transitions complete). Two-way bindable. */
  @Input() @InputBoolean() public suiVisible = true;
  /** Increment to replay the current **static** animation (`pulse`, `shake`, …). */
  @Input() public suiPlay = 0;
  /** Disables animations; visibility updates apply immediately. */
  @Input() @InputBoolean() public suiDisabled = false;

  @Output() public readonly suiVisibleChange = new EventEmitter<boolean>();
  /** Fires when a transition begins (visibility or static). */
  @Output() public readonly suiAnimationStart = new EventEmitter<void>();
  /** Fires when a transition finishes. */
  @Output() public readonly suiAnimationComplete = new EventEmitter<void>();
  /** After an inward transition that ends visible. */
  @Output() public readonly suiOnShow = new EventEmitter<void>();
  /** After an outward transition that ends hidden. */
  @Output() public readonly suiOnHide = new EventEmitter<void>();

  /** Mirrors Semantic UI state classes. */
  public animating = false;
  /** Final hidden state (opacity/visibility), not necessarily DOM removal. */
  public hidden = false;

  public hostClassList = '';

  private player: AnimationPlayer | null = null;
  private initialized = false;
  private lastVisible = true;
  private lastPlay = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['suiPlay']) {
      if (changes['suiPlay'].firstChange) {
        this.lastPlay = this.suiPlay;
      } else if (this.suiPlay !== this.lastPlay) {
        this.lastPlay = this.suiPlay;
        this.runStaticAnimation();
      }
    }

    if (changes['suiVisible']) {
      const cur = this.suiVisible;
      if (!this.initialized) {
        this.initialized = true;
        this.lastVisible = cur;
        this.applyImmediateVisibility(cur);
        this.syncHostClasses();
        return;
      }
      if (cur !== this.lastVisible) {
        this.lastVisible = cur;
        this.runVisibilityTransition(cur);
      }
    }

    if (
      changes['suiAnimation'] ||
      changes['suiDuration'] ||
      changes['suiDirection'] ||
      changes['suiDisabled']
    ) {
      this.syncHostClasses();
    }
  }

  public ngOnDestroy(): void {
    this.destroyPlayer();
  }

  /** Show with the current animation settings. */
  public show(): void {
    this.setVisible(true);
  }

  /** Hide with the current animation settings. */
  public hide(): void {
    this.setVisible(false);
  }

  /** Toggle visibility. */
  public toggle(): void {
    this.setVisible(!this.suiVisible);
  }

  /** Stop the active animation (Semantic `stop` / `stop all` style: clears current player). */
  public stop(): void {
    this.destroyPlayer();
    this.animating = false;
    this.syncHostClasses();
    this.cdr.markForCheck();
  }

  /** Run a static attention animation if `suiAnimation` is static; no-op otherwise. */
  public playStatic(): void {
    this.runStaticAnimation();
  }

  public setVisible(value: boolean): void {
    if (this.suiVisible === value) {
      return;
    }
    this.suiVisible = value;
    this.suiVisibleChange.emit(value);
    if (!this.initialized) {
      this.initialized = true;
      this.lastVisible = value;
      this.applyImmediateVisibility(value);
      this.syncHostClasses();
      this.cdr.markForCheck();
      return;
    }
    this.lastVisible = value;
    this.runVisibilityTransition(value);
    this.cdr.markForCheck();
  }

  private runVisibilityTransition(targetVisible: boolean): void {
    if (this.suiDisabled) {
      this.suiAnimationStart.emit();
      this.applyImmediateVisibility(targetVisible);
      this.emitVisibilityCallbacks(targetVisible);
      this.cdr.markForCheck();
      return;
    }
    const { baseName, explicitDirection } = parseTransitionName(this.suiAnimation);
    const direction = resolveTransitionDirection(
      explicitDirection,
      this.suiDirection,
      targetVisible
    );
    const motionBase = isStaticTransitionName(baseName) ? 'fade' : baseName;
    const durationCss = durationToCss(this.suiDuration);
    const steps =
      direction === 'in'
        ? buildEnterSteps(motionBase, durationCss)
        : buildLeaveSteps(motionBase, durationCss);
    this.playSteps(steps, targetVisible);
  }

  private runStaticAnimation(): void {
    const { baseName } = parseTransitionName(this.suiAnimation);
    if (!isStaticTransitionName(baseName) || this.suiDisabled) {
      return;
    }
    const steps = buildStaticSteps(baseName, durationToCss(this.suiDuration));
    if (!steps) {
      return;
    }
    this.playSteps(steps, true, true);
  }

  private playSteps(
    steps: AnimationMetadata[],
    endingVisible: boolean,
    isStatic = false
  ): void {
    this.destroyPlayer();
    this.animating = true;
    this.suiAnimationStart.emit();
    this.syncHostClasses();
    this.cdr.markForCheck();

    const factory = this.builder.build(steps);
    const player = factory.create(this.el.nativeElement);
    this.player = player;

    player.onDone(() => {
      this.zone.run(() => {
        this.player = null;
        this.animating = false;
        if (endingVisible) {
          this.applyVisibleEndState();
          this.hidden = false;
        } else {
          this.applyHiddenEndState();
          this.hidden = true;
        }
        this.suiAnimationComplete.emit();
        if (!isStatic) {
          if (endingVisible) {
            this.suiOnShow.emit();
          } else {
            this.suiOnHide.emit();
          }
        }
        this.syncHostClasses();
        this.cdr.markForCheck();
      });
    });

    player.play();
  }

  private emitVisibilityCallbacks(targetVisible: boolean): void {
    this.suiAnimationComplete.emit();
    if (targetVisible) {
      this.suiOnShow.emit();
    } else {
      this.suiOnHide.emit();
    }
  }

  private applyImmediateVisibility(visible: boolean): void {
    this.destroyPlayer();
    this.animating = false;
    if (visible) {
      this.applyVisibleEndState();
      this.hidden = false;
    } else {
      this.applyHiddenEndState();
      this.hidden = true;
    }
    this.syncHostClasses();
  }

  private applyVisibleEndState(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.setStyle(el, 'visibility', 'visible');
    this.renderer.removeStyle(el, 'transform');
    this.renderer.removeStyle(el, 'transform-origin');
    this.renderer.removeStyle(el, 'box-shadow');
  }

  private applyHiddenEndState(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'visibility', 'hidden');
    this.renderer.removeStyle(el, 'transform');
    this.renderer.removeStyle(el, 'transform-origin');
  }

  private destroyPlayer(): void {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }

  private syncHostClasses(): void {
    const { baseName } = parseTransitionName(this.suiAnimation);
    const tokens = ClassUtils.combineToClass([
      'transition',
      ...baseName.split(' '),
      ClassUtils.getPropClass(this.animating, 'animating'),
      ClassUtils.getPropClass(this.suiDisabled, 'disabled'),
      ClassUtils.getPropClass(!this.hidden, 'visible'),
      ClassUtils.getPropClass(this.hidden, 'hidden')
    ]);
    this.hostClassList = ClassUtils.removeExcessWhitespace(tokens);
  }
}
