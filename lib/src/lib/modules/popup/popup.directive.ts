import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  RendererStyleFlags2,
  TemplateRef,
  ViewContainerRef
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
  selector: '[sui-popup]'
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

  private _popupDomRef;

  constructor(private renderer: Renderer2, private element: ElementRef,
              private viewRef: ViewContainerRef) {
  }

  @HostListener('mouseover', ['$event'])
  public onHover(event: MouseEvent): void {
    if (!this._popupDomRef) {
      this.initializePopup();
    }

    this.showPopup();
  }

  @HostListener('mouseout')
  public onUnhover(): void {
    this.hidePopup();
  }

  public ngOnDestroy(): void {
    if (this._popupDomRef) {
      this.renderer.removeChild(this.element.nativeElement.parentNode, this._popupDomRef);
    }
  }

  private initializePopup(): void {
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

    // handle the title
    if (this.suiPopupTitle) {
      const titleDomRef = this.renderer.createElement('div');
      this.renderer.addClass(titleDomRef, 'header');
      this.renderer.appendChild(titleDomRef, this.renderer.createText(this.suiPopupTitle));
      this.renderer.appendChild(this._popupDomRef, titleDomRef);
    }

    // handle the content
    if (this.suiPopupContent) {
      const contentDomRef = this.renderer.createElement('div');
      this.renderer.addClass(contentDomRef, 'content');

      // if the content is a string then just render
      if (typeof this.suiPopupContent === 'string') {
        this.renderer.appendChild(contentDomRef, this.renderer.createText(this.suiPopupContent));
      }

      // if the content is a template ref, render it and embed
      if (this.suiPopupContent instanceof TemplateRef) {
        const view = this.viewRef.createEmbeddedView(this.suiPopupContent);
        view.detectChanges();

        for (const node of view.rootNodes) {
          this.renderer.appendChild(contentDomRef, node);
        }
      }

      this.renderer.appendChild(this._popupDomRef, contentDomRef);
    }

    // show the popup
    this.renderer.appendChild(this.element.nativeElement.parentNode, this._popupDomRef);
    this.showPopup();
  }

  private showPopup(): void {
    // remove the hidden attr
    this.renderer.removeClass(this._popupDomRef, 'hidden');

    // add the display attrs
    this.renderer.addClass(this._popupDomRef, 'visible');
    this.renderer.setStyle(this._popupDomRef, 'display', 'block', RendererStyleFlags2.Important);
  }

  private hidePopup(): void {
    // remove the hidden attr
    this.renderer.removeClass(this._popupDomRef, 'visible');

    // add the display attrs
    this.renderer.addClass(this._popupDomRef, 'hidden');
    this.renderer.removeStyle(this._popupDomRef, 'display', RendererStyleFlags2.Important);
  }
}
