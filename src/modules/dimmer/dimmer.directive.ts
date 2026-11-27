/**
 * Created by bolorundurowb on 1/6/2021
 */

import { ApplicationRef, ChangeDetectorRef, ComponentRef, ContentChild, Directive, ElementRef, EnvironmentInjector, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, TemplateRef, createComponent, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiDimmerContentDirective } from './dimmer-content.directive';
import { SuiDimmerComponent } from './dimmer.component';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  standalone: true,
  selector: '[sui-dimmer]',
  exportAs: 'suiDimmer'
})
export class SuiDimmerDirective extends BaseDirective implements OnChanges, OnDestroy, OnInit {
  private element = inject(ElementRef);
  private environmentInjector = inject(EnvironmentInjector);
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  @ContentChild(SuiDimmerContentDirective, { static: true, read: TemplateRef })
  private content: TemplateRef<any> | null = null;

  @Input() public suiDimmerAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiDimmerBlurring = false;
  @Input() @InputBoolean() public suiDimmerInverted = false;
  @Input() @InputBoolean() public suiDimmerSimple = false;
  @Input() @InputBoolean() public suiDimmerFullPage = false;
  @Input() @InputBoolean() public suiCloseOnClick = false;
  @Input() @InputBoolean() public disabled = false;
  @Output() public dimmedChange = new EventEmitter<boolean>();


  private _dimmed = false;
  private initialized = false;
  private componentRef: ComponentRef<SuiDimmerComponent> | null = null;
  private clickListener: (() => void) | null = null;

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
      this.syncDimmer();
      this.cdr.markForCheck();
      this.dimmedChange.emit(this._dimmed);
    }
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiDimmerBlurring, 'blurring'),
      'dimmable',
      ClassUtils.getPropClass(this.dimmed && !this.disabled, 'dimmed')
    ].join(' ');
  }

  public ngOnInit(): void {
    this.initialized = true;
    this.syncDimmer();
  }

  public ngOnChanges(): void {
    this.syncDimmer();
  }

  public ngOnDestroy(): void {
    this.clickListener?.();
    const component = this.componentRef;
    if (component) {
      this.removeDimmerNode(component.location.nativeElement);
      this.appRef.detachView(component.hostView);
      component.destroy();
    }
  }

  private syncDimmer(): void {
    if (!this.initialized) {
      return;
    }
    if (!this.dimmed || this.disabled) {
      if (this.componentRef) {
        this.removeDimmerNode(this.componentRef.location.nativeElement);
      }
      return;
    }

    const component = this.componentRef ??= this.createDimmer();
    component.setInput('suiAlignment', this.suiDimmerAlignment);
    component.setInput('suiBlurring', this.suiDimmerBlurring);
    component.setInput('suiInverted', this.suiDimmerInverted);
    component.setInput('suiSimple', this.suiDimmerSimple);
    component.setInput('suiFullPage', this.suiDimmerFullPage);
    component.setInput('suiContent', this.content);
    const node = component.location.nativeElement as HTMLElement;
    if (node.parentNode !== this.element.nativeElement) {
      this.renderer.appendChild(this.element.nativeElement, node);
    }
    if (this.suiCloseOnClick && !this.clickListener) {
      this.clickListener = this.renderer.listen(node, 'click', (event: MouseEvent) => {
        if (this.suiCloseOnClick && event.target === node.firstElementChild) {
          this.dimmed = false;
        }
      });
    }
  }

  private createDimmer(): ComponentRef<SuiDimmerComponent> {
    const component = createComponent(SuiDimmerComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector
    });
    this.appRef.attachView(component.hostView);
    return component;
  }

  private removeDimmerNode(node: HTMLElement): void {
    if (node.parentNode === this.element.nativeElement) {
      this.renderer.removeChild(this.element.nativeElement, node);
    }
  }
}
