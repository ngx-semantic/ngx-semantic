import {ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
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
export type SuiPopupTrigger = 'hover' | 'click';

@Directive({
  selector: '[sui-popup]',
  exportAs: 'suiPopup'
})
export class SuiPopupDirective implements OnInit, OnDestroy {
  @Input() public suiPopupPlacement: SuiPopupPlacement = 'top center';
  @Input() public suiPopupTrigger: SuiPopupTrigger = 'hover';
  @Input() public suiPopupWidth: SuiPopupWidth = null;
  @Input() public suiPopupSize: SuiSize = null;
  @Input() public suiPopupTitle: string;
  @Input() public suiPopupContent: string | TemplateRef<any>;
  @Input() public suiPopupInverted = false;
  @Input() public suiPopupFluid = false;
  @Input() public suiPopupFlowing = false;

  private delay = 200; // ms
  private _overlayRef?: OverlayRef;
  private _positionMap: { [type: string]: ConnectedPosition } = {
    topCenter: {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom'},
    topLeft: {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
    topRight: {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom'},
    rightCenter: {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center'},
    leftCenter: {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center'},
    bottomLeft: {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
    bottomCenter: {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top'},
    bottomRight: {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'}
  };

  constructor(private elementRef: ElementRef, private overlay: Overlay,
              private positionBuilder: OverlayPositionBuilder) {
  }

  public ngOnInit(): void {
    const scrollStrategy = this.overlay
      .scrollStrategies
      .close();
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions())
      .withPush(false);

    this._overlayRef = this.overlay.create({positionStrategy, scrollStrategy});
  }

  public ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }

  @HostListener('click')
  public onClick(): void {
    if (this.suiPopupTrigger === 'click') {
      this.initializePopup();
    }
  }

  @HostListener('document:click', ['$event'])
  public onPageClick(event: Event): void {
    if (this.suiPopupTrigger === 'click') {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.closePopup();
      }
    }
  }

  @HostListener('mouseover')
  public onHover(): void {
    if (this.suiPopupTrigger === 'hover') {
      this.initializePopup();
    }
  }

  @HostListener('mouseout')
  public onUnhover(): void {
    if (this.suiPopupTrigger === 'hover') {
      if (this.suiPopupFlowing) {
        return;
      }

      setTimeout(() => {
        this.closePopup();
      }, this.delay);
    }
  }

  private getPositions(): Array<ConnectedPosition> {
    if (this.suiPopupPlacement === 'top center') {
      return [this._positionMap.topCenter];
    } else if (this.suiPopupPlacement === 'top left') {
      return [this._positionMap.topLeft];
    } else if (this.suiPopupPlacement === 'top right') {
      return [this._positionMap.topRight];
    } else if (this.suiPopupPlacement === 'right center') {
      return [this._positionMap.rightCenter];
    } else if (this.suiPopupPlacement === 'left center') {
      return [this._positionMap.leftCenter];
    } else if (this.suiPopupPlacement === 'bottom left') {
      return [this._positionMap.bottomLeft];
    } else if (this.suiPopupPlacement === 'bottom center') {
      return [this._positionMap.bottomCenter];
    } else if (this.suiPopupPlacement === 'bottom right') {
      return [this._positionMap.bottomRight];
    }
  }

  private initializePopup(): void {
    const portal = new ComponentPortal(SuiPopupComponent);
    const popupRef: ComponentRef<SuiPopupComponent> = this._overlayRef?.attach(portal);

    // pass component info
    const popup = popupRef.instance;
    popup.suiPlacement = this.suiPopupPlacement;
    popup.suiWidth = this.suiPopupWidth;
    popup.suiSize = this.suiPopupSize;
    popup.suiTitle = this.suiPopupTitle;
    popup.suiContent = this.suiPopupContent;
    popup.suiInverted = this.suiPopupInverted;
    popup.suiFluid = this.suiPopupFluid;
    popup.suiFlowing = this.suiPopupFlowing;
  }

  private closePopup(): void {
    this._overlayRef?.detach();
  }
}
