/**
 * Created by bolorundurowb on 1/22/2021
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
           [ngClass]="classes">
        @if (suiClosable) {
          @if (!suiBasic) {
            <i sui-icon
               suiIconType="close"
               (click)="visible = false;"></i>
          }
        }

        @if (suiHeaderText || suiHeaderIcon) {
          <div [class.ui]="!!suiHeaderIcon"
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
export class SuiModalComponent implements OnDestroy {
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);
  private viewRef = inject(ViewContainerRef);

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

  private readonly uniqueId: number;
  private _visible = false;
  private _modalDomRef: HTMLElement | null = null;
  private clickListener: (() => void) | null = null;

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(isVisible: boolean) {
    if (isVisible) {
      this.showModal();
    } else {
      this.hideModal();
    }

    this._visible = isVisible;
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

  constructor() {
    this.uniqueId = Math.ceil(Math.random() * 100000000);
  }

  public ngOnDestroy(): void {
    const container = this.getModalFromDom();
    if (container) {
      this.renderer.removeChild(this.document.body, container);

      // if blurring, remove classes from the body
      if (this.suiBlurring) {
        this.renderer.removeClass(this.document.body, 'dimmable');
      }
    }
  }

  showModal(): void {
    if (!this.isModalInDom()) {
      this.generateDomElement();
    }

    if (!this._modalDomRef) {
      return;
    }

    // insert necessary classes to show the modal
    this.renderer.setProperty(this._modalDomRef, 'style', 'display: flex !important;');
    this.renderer.addClass(this._modalDomRef, 'visible');
    this.renderer.addClass(this._modalDomRef, 'active');

    // if blurring, add classes to the body
    if (this.suiBlurring) {
      this.renderer.addClass(this.document.body, 'dimmable');
      this.renderer.addClass(this.document.body, 'blurring');
      this.renderer.addClass(this.document.body, 'dimmed');
    }
  }

  hideModal(): void {
    if (this._modalDomRef) {
      // remove necessary classes to hide the modal
      this.renderer.removeAttribute(this._modalDomRef, 'style');
      this.renderer.removeClass(this._modalDomRef, 'visible');
      this.renderer.removeClass(this._modalDomRef, 'active');

      // if blurring, remove classes from the body
      if (this.suiBlurring) {
        this.renderer.removeClass(this.document.body, 'blurring');
        this.renderer.removeClass(this.document.body, 'dimmed');
      }
    }
  }

  private generateDomElement(): void {
    const container = this.renderer.createElement('div');
    this.renderer.setAttribute(container, 'id', this.uniqueId.toString());
    const containerStyle = 'ui dimmer modals page' + (this.suiCentered ? '' : ' top aligned') + ' transition';
    this.renderer.setAttribute(container, 'class', containerStyle);

    // render the modal contents
    const content = this.viewRef.createEmbeddedView(this.contentTemplate);
    content.detectChanges();
    for (const node of content.rootNodes) {
      this.renderer.appendChild(container, node);
    }

    // set the class properties
    this._modalDomRef = container;

    // set the click listener
    this.clickListener = this.renderer.listen(this._modalDomRef, 'click', (event) => {
      const targetId = event.target.id;
      if (targetId === this.uniqueId.toString()) {
        this.onClick();
      }
    });

    // insert the generated html into the DOM
    this.renderer.appendChild(this.document.body, this._modalDomRef);
  }

  private isModalInDom(): boolean {
    return !!this.getModalFromDom();
  }

  private getModalFromDom(): HTMLElement | null {
    return this.document.getElementById(String(this.uniqueId));
  }

  private onClick(): void {
    if (this.suiMaskClosable) {
      this.visible = false;
    }
  }
}
