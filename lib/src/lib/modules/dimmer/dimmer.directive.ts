/**
 * Created by bolorundurowb on 1/6/2021
 */

import {ConnectionPositionPair, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {
  ComponentRef,
  ContentChild,
  Directive, ElementRef,
  EventEmitter, HostBinding,
  Input, OnDestroy, OnInit,
  Output, Renderer2,
  TemplateRef, ViewContainerRef
} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiDimmerContentDirective} from './dimmer-content.directive';
import {SuiDimmerComponent} from "./dimmer.component";

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  selector: '[sui-dimmer]',
  exportAs: 'suiDimmer'
})
export class SuiDimmerDirective implements OnInit, OnDestroy {
  @ContentChild(SuiDimmerContentDirective, {static: true, read: TemplateRef}) private contentTemplate: TemplateRef<any>;

  @Input() public suiDimmerAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiDimmerBlurring = false;
  @Input() @InputBoolean() public suiDimmerInverted = false;
  @Input() @InputBoolean() public suiDimmerSimple = false;
  @Input() @InputBoolean() public suiDimmerFullPage = false;
  @Input() @InputBoolean() public suiCloseOnClick = true;
  @Input() @InputBoolean() public disabled = false;
  @Output() public dimmedChange = new EventEmitter<boolean>();

  private _dimmed = false;
  private _overlayRef?: OverlayRef;

  get dimmed(): boolean {
    return this._dimmed;
  }

  @Input()
  set dimmed(isDimmed: boolean) {
    if (this.disabled) {
      return;
    }

    if (isDimmed !== this._dimmed) {
      this._dimmed = isDimmed;
      this.dimmedChange.emit(this._dimmed);

      // implement Ui changes
      if (this._dimmed) {
        this.showDimmer();
      } else {
        this.hideDimmer();
      }
    }
  }

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiDimmerBlurring, 'blurring'),
      'dimmable',
      Utils.getPropClass(this.dimmed, 'dimmed')
    ].joinWithWhitespaceCleanup();
  }

  constructor(private element: ElementRef, private renderer: Renderer2,
              private overlay: Overlay, private vcr: ViewContainerRef) {
  }

  public ngOnInit(): void {
    const scrollStrategy = this.overlay
      .scrollStrategies
      .noop();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.element)
      .withPositions([
        new ConnectionPositionPair(
          {originX: 'start', originY: 'bottom'},
          {overlayX: 'start', overlayY: 'top'}
        ),
        new ConnectionPositionPair(
          {originX: 'start', originY: 'top'},
          {overlayX: 'start', overlayY: 'bottom'}
        )
      ])
      .withPush(false);

    this._overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'dimmer'
    });

    this._overlayRef
      .backdropClick()
      .subscribe(() => {
        if (this.suiCloseOnClick) {
          this.dimmed = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }

  private showDimmer(): void {
    if (!this._overlayRef?.hasAttached()) {
      const portal = new ComponentPortal(SuiDimmerComponent);
      const dimmerRef: ComponentRef<SuiDimmerComponent> = this._overlayRef?.attach(portal);

      // pass component info
      const dimmer = dimmerRef.instance;
      dimmer.suiAlignment = this.suiDimmerAlignment;
      dimmer.suiContent = this.contentTemplate;
      dimmer.suiFullPage = this.suiDimmerFullPage;
      dimmer.suiInverted = this.suiDimmerInverted;
      dimmer.suiSimple = this.suiDimmerSimple;
    }
  }

  private hideDimmer(): void {
    if (this._overlayRef?.hasAttached()) {
      this._overlayRef?.detach();
    }
  }
}
