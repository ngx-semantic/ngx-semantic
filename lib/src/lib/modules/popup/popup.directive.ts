import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef} from '@angular/core';
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
export class SuiPopupDirective implements OnInit {
  @Input() public suiPopupPlacement: SuiPopupPlacement = 'top center';
  @Input() public suiPopupWidth: SuiPopupWidth = null;
  @Input() public suiPopupSize: SuiSize = null;
  @Input() public suiPopupTitle: string;
  @Input() public suiPopupContent: string | TemplateRef<any>;
  @Input() public suiPopupInverted = false;
  @Input() public suiPopupFluid = false;
  @Input() public suiPopupFlowing = false;

  private overlayRef?: OverlayRef;

  constructor(private elementRef: ElementRef, private overlay: Overlay,
              private positionBuilder: OverlayPositionBuilder) {
  }

  public ngOnInit(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  @HostListener('mouseover')
  public onHover(): void {
    const portal = new ComponentPortal(SuiPopupComponent);
    const popupRef: ComponentRef<SuiPopupComponent> = this.overlayRef?.attach(portal);

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

  @HostListener('mouseout')
  public onUnhover(): void {
    this.overlayRef?.detach();
  }
}
