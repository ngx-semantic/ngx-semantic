/**
 * Created by bolorundurowb on 1/22/2021
 */

import { ChangeDetectionStrategy, Component, EmbeddedViewRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ModalStack } from './modal-stack.service';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiIconDirective } from 'ngx-semantic/elements/icon';

export type SuiModalSize = 'mini' | 'tiny' | 'small' | 'large' | null;
export type SuiModalScrollability = 'full' | 'medium' | 'none';

@Component({
  standalone: true,
  imports: [CommonModule, SuiIconDirective],
  selector: 'sui-modal',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #contentTemplate>
      <div style="display: block !important;"
           [ngClass]="classes"
           role="dialog"
           aria-modal="true"
           tabindex="-1"
           [attr.aria-labelledby]="suiHeaderText || suiHeaderIcon ? headerId : null">
        @if (suiClosable) {
          @if (!suiBasic) {
            <i sui-icon
               suiIconType="close"
               (click)="visible = false;"></i>
          }
        }

        @if (suiHeaderText || suiHeaderIcon) {
          <div [id]="headerId"
               [class.ui]="!!suiHeaderIcon"
               [class.icon]="!!suiHeaderIcon"
               [class.header]="true">
            @if (suiHeaderIcon) {
              <i sui-icon
                 [suiIconType]="suiHeaderIcon"></i>
            }
            {{suiHeaderText}}
          </div>
        }
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class SuiModalComponent implements OnChanges, OnDestroy, OnInit {
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);
  private viewRef = inject(ViewContainerRef);
  private readonly trapFactory = inject(FocusTrapFactory);
  private readonly stack = inject(ModalStack);

  @ViewChild('contentTemplate', { static: true }) public contentTemplate!: TemplateRef<any>;

  @Input() public suiHeaderText: string | null = null;
  @Input() public suiHeaderIcon: string | null = null;
  @Input() public suiSize: SuiModalSize = null;
  @Input() public suiScroll: SuiModalScrollability = 'none';
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiClosable = true;
  @Input() @InputBoolean() public suiCentered = true;
  @Input() @InputBoolean() public suiBlurring = false;
  @Input() @InputBoolean() public suiFullScreen = false;
  @Input() @InputBoolean() public suiMaskClosable = true;
  @Output() public visibleChange = new EventEmitter<boolean>();

  protected readonly headerId = this.stack.allocateId();
  private initialized = false;
  private dialog: HTMLElement | null = null;
  private contentView: EmbeddedViewRef<unknown> | null = null;
  private keyListener: (() => void) | null = null;
  private _visible = false;
  private _modalDomRef: HTMLElement | null = null;
  private clickListener: (() => void) | null = null;

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(isVisible: boolean) {
    if (isVisible === this._visible) {
      return;
    }
    this._visible = isVisible;
    this.syncVisibility();
    this.visibleChange.emit(isVisible);
  }

  get classes(): string {
    return [
      'ui',
      this.suiSize,
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      ClassUtils.getPropClass(this.suiFullScreen, 'fullscreen'),
      this.scrollClass,
      'modal',
      'transition',
      'visible',
      'active'
    ].join(' ');
  }

  /**
   * In all wisdom, semantic-ui decided that 'longer' would be shorter than 'long', go figure
   */
  get scrollClass(): string {
    if (this.suiScroll === 'full') {
      return 'long';
    } else if (this.suiScroll === 'medium') {
      return 'longer';
    } else {
      return '';
    }
  }

  public ngOnInit(): void {
    this.initialized = true;
    this.syncVisibility();
  }

  public ngOnChanges(): void {
    if (this.dialog) {
      this.stack.setBlurring(this.dialog, this.suiBlurring, this.renderer);
    }
  }

  public ngOnDestroy(): void {
    this.close();
    this.clickListener?.();
    if (this._modalDomRef) {
      this.renderer.removeChild(this.document.body, this._modalDomRef);
    }
    if (this.contentView && !this.contentView.destroyed) {
      this.contentView.destroy();
    }
  }

  public showModal(): void {
    this.visible = true;
  }

  public hideModal(): void {
    this.visible = false;
  }

  private syncVisibility(): void {
    if (!this.initialized) {
      return;
    }
    if (!this.visible) {
      this.close();
      return;
    }
    const container = this._modalDomRef ?? this.generateDomElement();
    const dialog = this.dialog!;
    this.renderer.setAttribute(container, 'style', 'display: flex !important;');
    this.renderer.addClass(container, 'visible');
    this.renderer.addClass(container, 'active');
    this.stack.open(dialog, this.trapFactory.create(dialog), this.suiBlurring, this.renderer);
    this.keyListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented && this.suiClosable && this.stack.isTop(dialog)) {
        event.preventDefault();
        this.hideModal();
      }
    });
  }

  private close(): void {
    this.keyListener?.();
    this.keyListener = null;
    if (this._modalDomRef && this.dialog) {
      this.renderer.removeAttribute(this._modalDomRef, 'style');
      this.renderer.removeClass(this._modalDomRef, 'visible');
      this.renderer.removeClass(this._modalDomRef, 'active');
      this.stack.close(this.dialog, this.renderer);
    }
  }

  private generateDomElement(): HTMLElement {
    const container: HTMLElement = this.renderer.createElement('div');
    const containerStyle = 'ui dimmer modals page' + (this.suiCentered ? '' : ' top aligned') + ' transition';
    this.renderer.setAttribute(container, 'class', containerStyle);

    const content = this.viewRef.createEmbeddedView(this.contentTemplate);
    this.contentView = content;
    content.detectChanges();
    for (const node of content.rootNodes) {
      this.renderer.appendChild(container, node);
    }
    this.dialog = container.firstElementChild as HTMLElement;
    this._modalDomRef = container;
    this.clickListener = this.renderer.listen(container, 'click', (event: MouseEvent) => {
      if (event.target === container && this.suiMaskClosable && this.stack.isTop(this.dialog!)) {
        this.hideModal();
      }
    });
    this.renderer.appendChild(this.document.body, container);
    return container;
  }
}
