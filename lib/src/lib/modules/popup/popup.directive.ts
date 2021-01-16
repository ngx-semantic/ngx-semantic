import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {
  Directive,
  ElementRef,
  HostListener,
  Input, OnInit,
  TemplateRef
} from '@angular/core';
import {SuiSize} from '../../common';

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

  constructor(private elementRef: ElementRef, private overlay: Overlay) {
  }

  public ngOnInit(): void {
    this.overlayRef = this.overlay.create({});
  }

  @HostListener('mouseover')
  public onHover(): void {
  }

  @HostListener('mouseout')
  public onUnhover(): void {
    this.overlayRef?.detach();
  }
}
