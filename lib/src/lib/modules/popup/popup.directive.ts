import {ConnectionPositionPair, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef, Host,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  RendererStyleFlags2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {SuiSize} from '../../common';
import {SuiPopupComponent} from './popup.component';

export type SuiPopupPlacement =
  'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'right center'
  | 'left center';
export type SuiPopupWidth = 'wide' | 'very wide' | null;

@Directive({
  selector: '[sui-popup]',
  exportAs: 'suiPopup'
})
export class SuiPopupDirective implements OnDestroy {
  @Input() public suiPopupPlacement: SuiPopupPlacement = 'top center';
  @Input() public suiPopupWidth: SuiPopupWidth = null;
  @Input() public suiPopupSize: SuiSize = null;
  @Input() public suiPopupTitle: string;
  @Input() public suiPopupContent: string | TemplateRef<any>;
  @Input() public suiPopupInverted = false;
  @Input() public suiPopupFluid = false;
  @Input() public suiPopupFlowing = false;

  private unsubscribe = new Subject();
  private overlayRef?: OverlayRef;
  private _componentRef: ComponentRef<SuiPopupComponent>;

  constructor(private elementRef: ElementRef,              private overlay: Overlay,
               private resolver: ComponentFactoryResolver, private vcr: ViewContainerRef) {
  }

  @HostListener('mouseover', ['$event'])
  public onHover(event: MouseEvent): void {
    if (!this.overlayRef) {
      this.initializePopup();
    }

    this.showPopup();
  }

  @HostListener('mouseout')
  public onUnhover(): void {
    this.hidePopup();
  }

  public ngOnDestroy(): void {
    this.hidePopup();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private initializePopup(): void {
    const scrollStrategy = this.overlay
      .scrollStrategies
      .reposition();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withPositions([
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
      ])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.hidePopup();
      });
  }

  private showPopup(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new ComponentPortal(SuiPopupComponent, this.vcr, null, this.resolver);

      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private hidePopup(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
