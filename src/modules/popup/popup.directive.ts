import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';
import {SuiSize} from 'ngx-semantic/core/enums';
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
  @Input() @InputBoolean() public suiPopupInverted = false;
  @Input() @InputBoolean() public suiPopupFluid = false;
  @Input() @InputBoolean() public suiPopupFlowing = false;

  private delay = 200; // ms

  constructor(private elementRef: ElementRef ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
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
      setTimeout(() => {
        this.closePopup();
      }, this.delay);
    }
  }

  private initializePopup(): void {
    if (!true) {

      // pass component info
      // const popup = popupRef.instance;
      // popup.suiPlacement = this.suiPopupPlacement;
      // popup.suiWidth = this.suiPopupWidth;
      // popup.suiSize = this.suiPopupSize;
      // popup.suiTitle = this.suiPopupTitle;
      // popup.suiContent = this.suiPopupContent;
      // popup.suiInverted = this.suiPopupInverted;
      // popup.suiFluid = this.suiPopupFluid;
      // popup.suiFlowing = this.suiPopupFlowing;
    }
  }

  private closePopup(): void {
  }
}
