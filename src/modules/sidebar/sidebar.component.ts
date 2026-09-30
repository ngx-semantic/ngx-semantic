/**
 * Created by bolorundurowb on 12/30/2020
 */

import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiSidebarService } from './sidebar.service';

export type SuiSidebarPosition = 'top' | 'bottom' | 'left' | 'right';
export type SuiSidebarWidth = 'thin' | 'very thin' | 'wide' | 'very wide' | null;
export type SuiSidebarAnimation = 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide along' | 'slide out' | null;

/** Matches the Semantic UI sidebar transition duration. */
const SIDEBAR_ANIMATION_DURATION = 500;

@Component({
  standalone: true,
  selector: 'sui-sidebar, [sui-sidebar]',
  exportAs: 'suiSidebar',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarComponent implements OnInit, OnDestroy {
  private sidebarService = inject(SuiSidebarService);

  @Input() public suiSidebarPosition: SuiSidebarPosition = 'left';
  @Input() public suiSidebarWidth: SuiSidebarWidth = null;
  @Input() public suiSidebarAnimation: SuiSidebarAnimation = null;
  @Input() @InputBoolean() public suiInverted = false;
  /** Whether clicking the pusher hides a sidebar whose visibility is two-way bound. */
  @Input() @InputBoolean() public suiClosable = true;
  @Output() public visibleChange = new EventEmitter<boolean>();

  public animating = false;

  private _visible = true;
  private animationTimer: ReturnType<typeof setTimeout> | null = null;
  private initialised = false;
  private readonly subscription: Subscription;

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(isVisible) {
    const value = !!isVisible;
    // only animate changes made after the initial binding, so the sidebar does not flash on load
    if (this.initialised && value !== this._visible) {
      this.startAnimating();
    }
    this._visible = value;
    this.visibleChange.emit(this._visible);
    this.sidebarService.changeVisibility(this._visible);
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSidebarPosition,
      this.suiSidebarWidth,
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'sidebar',
      this.suiSidebarAnimation,
      ClassUtils.getPropClass(this.animating, 'animating'),
      ClassUtils.getPropClass(this.visible, 'visible')
    ].join(' ').replace(/\s\s+/g, ' ').trim();
  }

  constructor() {
    this.sidebarService.changeVisibility(this._visible);
    this.subscription = this.sidebarService.pusherClicked
      .subscribe(() => {
        // only close the sidebar from the pusher when its visibility is bound, i.e. [(visible)]
        if (this.suiClosable && this.visibleChange.observed) {
          this.visible = false;
        }
      });
  }

  public ngOnInit(): void {
    this.initialised = true;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }
  }

  /** Mirrors `sidebar('toggle')`. */
  public toggle(): void {
    this.visible = !this.visible;
  }

  /** Mirrors `sidebar('show')`. */
  public show(): void {
    this.visible = true;
  }

  /** Mirrors `sidebar('hide')`. */
  public hide(): void {
    this.visible = false;
  }

  private startAnimating(): void {
    this.animating = true;
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }
    this.animationTimer = setTimeout(() => {
      this.animating = false;
      this.animationTimer = null;
    }, SIDEBAR_ANIMATION_DURATION);
  }
}
