/**
 * Created by bolorundurowb on 1/6/2021
 */

import {
  AfterContentInit,
  ContentChild,
  Directive, ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output, Renderer2, RendererStyleFlags2,
  TemplateRef, ViewContainerRef
} from '@angular/core';
import {Utils} from '../../common';
import {SuiDimmerContentDirective} from './dimmer-content.directive';

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  selector: '[sui-dimmer]'
})
export class SuiDimmerDirective implements AfterContentInit {
  @ContentChild(SuiDimmerContentDirective, {static: true, read: TemplateRef}) private content: TemplateRef<any>;

  @Input() public suiAlignment: SuiDimmerContentAlignment = null;
  @Input() public suiBlurring = false;
  @Input() public suiInverted = false;
  @Input() public suiSimple = false;
  @Input() public suiFullPage = false;
  @Input() public disabled = false;

  private _dimmed = false;
  private _dimmerDomRef: any;

  @Input()
  public set dimmed(isDimmed: boolean) {
    if (isDimmed !== this._dimmed) {
      this._dimmed = isDimmed;
      this.dimmedChanged.emit(this._dimmed);
    }
  }

  public get dimmed(): boolean {
    return this._dimmed;
  }

  @Output() public dimmedChanged = new EventEmitter<boolean>();

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiBlurring, 'blurring'),
      'dimmable',
      Utils.getPropClass(this.dimmed, 'dimmed')
    ].joinWithWhitespaceCleanup();
  }

  constructor(private renderer: Renderer2, private element: ElementRef,
              private viewRef: ViewContainerRef) {
  }

  public ngAfterContentInit(): void {
    this._dimmerDomRef = this.renderer.createElement('div');
    this.renderer.addClass(this._dimmerDomRef, 'ui');

    if (this.suiFullPage) {
      this.renderer.addClass(this._dimmerDomRef, 'page');
    }

    if (this.suiSimple) {
      this.renderer.addClass(this._dimmerDomRef, 'simple');
    }

    if (this.suiInverted) {
      this.renderer.addClass(this._dimmerDomRef, 'inverted');
    }

    if (this.suiAlignment) {
      this.renderer.addClass(this._dimmerDomRef, this.suiAlignment);
      this.renderer.addClass(this._dimmerDomRef, 'aligned');
    }

    this.renderer.addClass(this._dimmerDomRef, 'dimmer');
    this.renderer.addClass(this._dimmerDomRef, 'transition');
    this.renderer.addClass(this._dimmerDomRef, 'hidden');
    this.renderer.setStyle(this._dimmerDomRef, 'display', 'flex', RendererStyleFlags2.Important);

    //  if there is embedded content, then render it
    if (this.content) {
      const dimmerContentDomRef = this.renderer.createElement('div');
      this.renderer.addClass(dimmerContentDomRef, 'content');

      // get the directive content and append to this div
      const embeddedView = this.viewRef.createEmbeddedView(this.content);
      embeddedView.detectChanges();
      for (const node of embeddedView.rootNodes) {
        this.renderer.appendChild(dimmerContentDomRef, node);
      }

      // add content to root div
      this.renderer.appendChild(this._dimmerDomRef, dimmerContentDomRef);
    }

    this.renderer.appendChild(this.element.nativeElement, this._dimmerDomRef);
  }

  private showDimmer(): void {
    // remove the hidden attr
    this.renderer.removeClass(this._dimmerDomRef, 'hidden');

    // add the display attrs
    this.renderer.addClass(this._dimmerDomRef, 'visible');
    this.renderer.addClass(this._dimmerDomRef, 'active');
  }

  private hideDimmer(): void {
    // remove the display attrs
    this.renderer.removeClass(this._dimmerDomRef, 'visible');
    this.renderer.removeClass(this._dimmerDomRef, 'active');

    // add the hidden attr
    this.renderer.addClass(this._dimmerDomRef, 'hidden');
  }
}
