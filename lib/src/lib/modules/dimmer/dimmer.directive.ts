/**
 * Created by bolorundurowb on 1/6/2021
 */

import {
  AfterContentInit,  ContentChild,
  Directive, ElementRef,
  EventEmitter,  HostBinding,
  Input, OnDestroy, OnInit,
  Output, Renderer2, RendererStyleFlags2,
  TemplateRef, ViewContainerRef
} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiDimmerContentDirective} from './dimmer-content.directive';

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  selector: '[sui-dimmer]',
  exportAs: 'suiDimmer'
})
export class SuiDimmerDirective implements OnInit, AfterContentInit, OnDestroy {
  @ContentChild(SuiDimmerContentDirective, {static: true, read: TemplateRef}) private content: TemplateRef<any>;

  @Input() public suiDimmerAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiDimmerBlurring = false;
  @Input() @InputBoolean() public suiDimmerInverted = false;
  @Input() @InputBoolean() public suiDimmerSimple = false;
  @Input() @InputBoolean() public suiDimmerFullPage = false;
  @Input() @InputBoolean() public suiCloseOnClick = true;
  @Input() @InputBoolean() public disabled = false;
  @Output() public dimmedChange = new EventEmitter<boolean>();

  private _dimmed = false;
  private _dimmerDomRef: any;
  private unlistener: () => void;

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

  constructor(private renderer: Renderer2, private element: ElementRef,
              private viewRef: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this._dimmerDomRef = this.renderer.createElement('div');
    this.renderer.addClass(this._dimmerDomRef, 'ui');

    if (this.suiDimmerFullPage) {
      this.renderer.addClass(this._dimmerDomRef, 'page');
    }

    if (this.suiDimmerSimple) {
      this.renderer.addClass(this._dimmerDomRef, 'simple');
    }

    if (this.suiDimmerInverted) {
      this.renderer.addClass(this._dimmerDomRef, 'inverted');
    }

    if (this.suiDimmerAlignment) {
      this.renderer.addClass(this._dimmerDomRef, this.suiDimmerAlignment);
      this.renderer.addClass(this._dimmerDomRef, 'aligned');
    }

    this.renderer.addClass(this._dimmerDomRef, 'dimmer');
    this.renderer.addClass(this._dimmerDomRef, 'transition');
    this.renderer.addClass(this._dimmerDomRef, 'hidden');
    this.renderer.setStyle(this._dimmerDomRef, 'display', 'flex', RendererStyleFlags2.Important);

    // if dimmer is t be shown, then render
    if (this.dimmed) {
      this.showDimmer();
    }

    this.renderer.appendChild(this.element.nativeElement, this._dimmerDomRef);
    this.unlistener = this.renderer.listen(this._dimmerDomRef, 'click', (event) => {
      const classes = event.target.className;
      // verify that the dimmer is shown and is the item clicked
      if (classes.includes('ui') && classes.includes('dimmer') && classes.includes('visible')) {
        this.onClick();
      }
    });

    console.log(this._dimmerDomRef);
  }

  public ngAfterContentInit(): void {
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
  }

  public ngOnDestroy(): void {
    this.unlistener();

    // remove the dom element if it exists
    if (this._dimmerDomRef) {
      this.renderer.removeChild(this.element.nativeElement, this._dimmerDomRef);
    }
  }

  private showDimmer(): void {
    if (this._dimmerDomRef) {
      // remove the hidden attr
      this.renderer.removeClass(this._dimmerDomRef, 'hidden');

      // add the display attrs
      this.renderer.addClass(this._dimmerDomRef, 'visible');
      this.renderer.addClass(this._dimmerDomRef, 'active');
    }
  }

  private hideDimmer(): void {
    if (this._dimmerDomRef) {
      // remove the display attrs
      this.renderer.removeClass(this._dimmerDomRef, 'visible');
      this.renderer.removeClass(this._dimmerDomRef, 'active');

      // add the hidden attr
      this.renderer.addClass(this._dimmerDomRef, 'hidden');
    }
  }

  private onClick(): void {
    if (this.suiCloseOnClick) {
      this.dimmed = false;
    }
  }
}
