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

  // tslint:disable-next-line:variable-name
  private _dimmed = false;

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
    const dimmer = this.renderer.createElement('div');
    this.renderer.addClass(dimmer, 'ui');

    if (this.suiFullPage) {
      this.renderer.addClass(dimmer, 'page');
    }

    if (this.suiSimple) {
      this.renderer.addClass(dimmer, 'simple');
    }

    if (this.suiInverted) {
      this.renderer.addClass(dimmer, 'inverted');
    }

    if (this.suiAlignment) {
      this.renderer.addClass(dimmer, this.suiAlignment);
      this.renderer.addClass(dimmer, 'aligned');
    }

    this.renderer.addClass(dimmer, 'dimmer');
    this.renderer.addClass(dimmer, 'transition');
    this.renderer.addClass(dimmer, 'hidden');
    this.renderer.setStyle(dimmer, 'display', 'flex', RendererStyleFlags2.Important);

    //  if there is embedded content, then render it
    if (this.content) {
      const contentContainer = this.renderer.createElement('div');
      this.renderer.addClass(contentContainer, 'content');

      // get the directive content and append to this div
      const embeddedView = this.viewRef.createEmbeddedView(this.content);
      embeddedView.detectChanges();
      for (const node of embeddedView.rootNodes) {
        this.renderer.appendChild(contentContainer, node);
      }

      // add content to root div
      this.renderer.appendChild(dimmer, contentContainer);
    }

    this.renderer.appendChild(this.element.nativeElement, dimmer);
  }
}
