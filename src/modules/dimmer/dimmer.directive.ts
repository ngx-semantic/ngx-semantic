/**
 * Created by bolorundurowb on 1/6/2021
 */

import {
  ApplicationRef, ComponentFactoryResolver,
  ContentChild, Directive, ElementRef, EmbeddedViewRef,
  EventEmitter, HostBinding, Injector, Input, OnChanges, OnDestroy,
  Output, Renderer2, SimpleChanges, TemplateRef
} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiDimmerContentDirective} from './dimmer-content.directive';
import {SuiDimmerComponent} from './dimmer.component';

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  selector: '[sui-dimmer]',
  exportAs: 'suiDimmer'
})
export class SuiDimmerDirective implements OnChanges, OnDestroy {
  @ContentChild(SuiDimmerContentDirective, {static: true, read: TemplateRef}) private content: TemplateRef<any>;

  @Input() public suiDimmerAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiDimmerBlurring = false;
  @Input() @InputBoolean() public suiDimmerInverted = false;
  @Input() @InputBoolean() public suiDimmerSimple = false;
  @Input() @InputBoolean() public suiDimmerFullPage = false;
  @Input() @InputBoolean() public suiCloseOnClick = false;
  @Input() @InputBoolean() public disabled = false;
  @Output() public dimmedChange = new EventEmitter<boolean>();


  private _dimmed;
  private _dimmerDomRef: HTMLElement;
  private clickListener: () => void;

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
    }
  }

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiDimmerBlurring, 'blurring'),
      'dimmable',
      ClassUtils.getPropClass(this.dimmed, 'dimmed')
    ].join(' ');
  }

  constructor(private element: ElementRef, private factoryResolver: ComponentFactoryResolver,
              private injector: Injector, private appRef: ApplicationRef,
              private renderer: Renderer2) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.generateDomElement();
    this.hideDimmer();

    if (this.dimmed) {
      this.showDimmer();
    }
  }

  public ngOnDestroy(): void {
    // resent the handler
    if (this.clickListener) {
      this.clickListener();
    }

    // remove the dom element if it exists
    if (this._dimmerDomRef) {
      this.hideDimmer();
    }
  }

  private generateDomElement(): void {
    const factory = this.factoryResolver.resolveComponentFactory(SuiDimmerComponent);
    const component = factory.create(this.injector);
    component.instance.suiAlignment = this.suiDimmerAlignment;
    component.instance.suiBlurring = this.suiDimmerBlurring;
    component.instance.suiInverted = this.suiDimmerInverted;
    component.instance.suiSimple = this.suiDimmerSimple;
    component.instance.suiFullPage = this.suiDimmerFullPage;
    component.instance.suiContent = this.content;

    this.appRef.attachView(component.hostView);
    this._dimmerDomRef = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (this.suiCloseOnClick) {
      this.clickListener = this.renderer.listen(this._dimmerDomRef, 'click', (event) => {
        const classes = Array.from(event.target.classList);
        // verify that the dimmer is shown and is the item clicked
        if (classes.includes('ui') && classes.includes('dimmer') && classes.includes('visible')) {
          this.dimmed = false;
        }
      });
    }
  }

  private showDimmer(): void {
    if (!this.disabled) {
      if (this._dimmerDomRef && !this.isDimmerInDom()) {
        this.element.nativeElement.appendChild(this._dimmerDomRef);
      }
    }
  }

  private hideDimmer(): void {
    if (!this.disabled) {
      const dimmer = this.getDimmerFromDom();

      if (dimmer) {
        this.element.nativeElement.removeChild(dimmer);
      }
    }
  }

  private isDimmerInDom(): boolean {
    return !!this.getDimmerFromDom();
  }

  private getDimmerFromDom(): any {
    const elements = Array.from(this.element.nativeElement.children);
    // tslint:disable-next-line:no-string-literal
    return elements.filter(x => x['localName'] === 'sui-dimmer')[0];
  }
}
