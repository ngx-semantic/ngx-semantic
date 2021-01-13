import {Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
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
  selector: '[sui-popup]'
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

  private _popupDomRef;

  constructor(private renderer: Renderer2, private element: ElementRef,
              private viewRef: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this._popupDomRef = this.renderer.createElement('div');
    this.renderer.addClass(this._popupDomRef, 'ui');

    if (this.suiPopupWidth) {
      if (this.suiPopupWidth === 'very wide') {
        this.renderer.addClass(this._popupDomRef, 'very');
      }

      this.renderer.addClass(this._popupDomRef, 'wide');
    }

    if (this.suiPopupSize) {
      this.renderer.addClass(this._popupDomRef, this.suiPopupSize);
    }

    if (this.suiPopupInverted) {
      this.renderer.addClass(this._popupDomRef, 'inverted');
    }

    if (this.suiPopupFluid) {
      this.renderer.addClass(this._popupDomRef, 'fluid');
    }

    if (this.suiPopupFlowing) {
      this.renderer.addClass(this._popupDomRef, 'flowing');
    }

    this.renderer.addClass(this._popupDomRef, 'popup');

    // handle position of popup
    const placementParts = this.suiPopupPlacement.split(' ');
    placementParts.forEach((part) => this.renderer.addClass(this._popupDomRef, part));

    this.renderer.addClass(this._popupDomRef, 'transition');
    this.renderer.addClass(this._popupDomRef, 'hidden');
  }
}
