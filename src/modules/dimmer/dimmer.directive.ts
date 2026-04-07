/**
 * Created by bolorundurowb on 1/6/2021
 */

import {
  ApplicationRef,
  ComponentRef,
  ContentChild,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiDimmerContentDirective } from './dimmer-content.directive';
import { SuiDimmerComponent } from './dimmer.component';
import { SuiDimmerContentAlignment, SuiDimmerOn } from './dimmer.types';

export type { SuiDimmerContentAlignment, SuiDimmerOn } from './dimmer.types';

@Directive({
  standalone: true,
  selector: '[sui-dimmer]',
  exportAs: 'suiDimmer'
})
export class SuiDimmerDirective implements OnChanges, OnDestroy {
  private element = inject(ElementRef<HTMLElement>);
  private envInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private renderer = inject(Renderer2);

  @ContentChild(SuiDimmerContentDirective, { static: true, read: TemplateRef })
  private content: TemplateRef<any> | null = null;

  @Input() public suiDimmerAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiDimmerBlurring = false;
  @Input() @InputBoolean() public suiDimmerInverted = false;
  @Input() @InputBoolean() public suiDimmerSimple = false;
  @Input() @InputBoolean() public suiDimmerFullPage = false;
  @Input() @InputBoolean() public suiCloseOnClick = false;
  @Input() @InputBoolean() public disabled = false;
  /** When set, pointer on the dimmable host toggles the dimmer (Semantic UI `on`). */
  @Input() public suiDimmerOn: SuiDimmerOn = null;
  /** Animation duration in ms for the dimmer layer (Semantic UI `duration`). */
  @Input() public suiDimmerDuration: number | null = null;
  /** Extra transition class on the dimmer (Semantic UI `transition`). */
  @Input() public suiDimmerTransition: string | null = null;
  /** Distinguishes multiple dimmers (Semantic UI `dimmerName`); exposed as `data-dimmer-name`. */
  @Input() public suiDimmerName: string | null = null;

  @Output() public dimmedChange = new EventEmitter<boolean>();
  @Output() public suiDimmerShow = new EventEmitter<void>();
  @Output() public suiDimmerHide = new EventEmitter<void>();

  private _dimmed = false;
  private dimmerRef: ComponentRef<SuiDimmerComponent> | null = null;
  private _dimmerDomRef: HTMLElement | null = null;
  private clickUnlisten: (() => void) | null = null;

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
      ClassUtils.getPropClass(this.dimmed && !this.disabled, 'dimmed'),
      ClassUtils.getPropClass(this.disabled, 'disabled')
    ].join(' ');
  }

  @HostListener('mouseenter')
  onHostMouseEnter(): void {
    if (this.suiDimmerOn !== 'hover' || this.disabled) {
      return;
    }
    this.setDimmedFromInteraction(true);
  }

  @HostListener('mouseleave')
  onHostMouseLeave(): void {
    if (this.suiDimmerOn !== 'hover' || this.disabled) {
      return;
    }
    this.setDimmedFromInteraction(false);
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    if (this.suiDimmerOn !== 'click' || this.disabled) {
      return;
    }
    const t = event.target as HTMLElement | null;
    const host = this.element.nativeElement;
    if (!t || !host.contains(t)) {
      return;
    }
    if (this._dimmed) {
      if (t.closest('.content')) {
        return;
      }
      this.setDimmedFromInteraction(false);
      return;
    }
    this.setDimmedFromInteraction(true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']?.currentValue === true && this._dimmed) {
      this._dimmed = false;
      queueMicrotask(() => this.dimmedChange.emit(false));
    }

    if (this._dimmed && !this.disabled) {
      this.ensureDimmerRef();
    }

    if (this.dimmerRef) {
      this.syncDimmerComponentInputs();
    }

    this.refreshCloseListener();

    if (this._dimmed && !this.disabled) {
      this.showDimmer();
    } else {
      this.hideDimmer();
    }
  }

  public ngOnDestroy(): void {
    this.teardownCloseListener();
    this.destroyDimmerRef();
  }

  private setDimmedFromInteraction(next: boolean): void {
    if (this.disabled) {
      return;
    }
    if (next === this._dimmed) {
      return;
    }
    this._dimmed = next;
    this.dimmedChange.emit(this._dimmed);
    if (this._dimmed) {
      this.ensureDimmerRef();
      this.syncDimmerComponentInputs();
      this.refreshCloseListener();
      this.showDimmer();
    } else {
      this.hideDimmer();
      this.refreshCloseListener();
    }
  }

  private ensureDimmerRef(): void {
    if (this.dimmerRef) {
      return;
    }
    const ref = createComponent(SuiDimmerComponent, {
      environmentInjector: this.envInjector
    });
    this.appRef.attachView(ref.hostView);
    this.dimmerRef = ref;
    this._dimmerDomRef = ref.location.nativeElement;
    this.syncDimmerComponentInputs();
  }

  private syncDimmerComponentInputs(): void {
    if (!this.dimmerRef) {
      return;
    }
    const r = this.dimmerRef;
    r.setInput('suiAlignment', this.suiDimmerAlignment);
    r.setInput('suiInverted', this.suiDimmerInverted);
    r.setInput('suiSimple', this.suiDimmerSimple);
    r.setInput('suiFullPage', this.suiDimmerFullPage);
    r.setInput('suiDisabled', this.disabled);
    r.setInput('suiContent', this.content);
    r.setInput('suiDurationMs', this.suiDimmerDuration);
    r.setInput('suiTransition', this.suiDimmerTransition);
    r.setInput('suiDimmerName', this.suiDimmerName);
    r.changeDetectorRef.detectChanges();
  }

  private refreshCloseListener(): void {
    this.teardownCloseListener();
    if (!this.suiCloseOnClick || !this._dimmerDomRef || this.suiDimmerOn === 'click') {
      return;
    }
    this.clickUnlisten = this.renderer.listen(this._dimmerDomRef, 'click', (event: MouseEvent) => {
      const root = this._dimmerDomRef;
      if (!root || this.disabled || !this._dimmed) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (!target || !root.contains(target)) {
        return;
      }
      if (target.closest('.content')) {
        return;
      }
      this.setDimmedFromInteraction(false);
    });
  }

  private teardownCloseListener(): void {
    if (this.clickUnlisten) {
      this.clickUnlisten();
      this.clickUnlisten = null;
    }
  }

  private showDimmer(): void {
    if (this.disabled || !this._dimmerDomRef) {
      return;
    }
    if (!this.isDimmerInDom()) {
      this.element.nativeElement.appendChild(this._dimmerDomRef);
      this.suiDimmerShow.emit();
    }
  }

  private hideDimmer(): void {
    const dimmer = this.getDimmerFromDom();
    if (dimmer) {
      this.element.nativeElement.removeChild(dimmer);
      this.suiDimmerHide.emit();
    }
  }

  private destroyDimmerRef(): void {
    this.teardownCloseListener();
    if (this.dimmerRef) {
      this.hideDimmer();
      this.appRef.detachView(this.dimmerRef.hostView);
      this.dimmerRef.destroy();
      this.dimmerRef = null;
      this._dimmerDomRef = null;
    }
  }

  private isDimmerInDom(): boolean {
    return !!this.getDimmerFromDom();
  }

  private getDimmerFromDom(): Element | undefined {
    const elements = Array.from(this.element.nativeElement.children) as Element[];
    return elements.find((el) => el.localName === 'sui-dimmer');
  }
}
