/**
 * Created by bolorundurowb on 1/22/2021
 */

import {
  ChangeDetectionStrategy, Component,
  EventEmitter, Inject,
  Input, OnDestroy, Output,
  Renderer2, TemplateRef,
  ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {DOCUMENT} from '@angular/common';

export type SuiModalSize = 'mini' | 'tiny' | 'small' | 'large' | null;
export type SuiModalScrollability = 'full' | 'medium' | 'none';

@Component({
  selector: 'sui-modal',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #contentTemplate>
      <div style="display: block !important;"
           [ngClass]="classes">
        <ng-container *ngIf="suiClosable">
          <i *ngIf="!suiBasic"
             sui-icon
             suiIconType="close"
             (click)="visible = false;"></i>
        </ng-container>

        <ng-container *ngIf="suiHeaderText || suiHeaderIcon">
          <div [class.ui]="!!suiHeaderIcon"
               [class.icon]="!!suiHeaderIcon"
               [class.header]="true">
            <i sui-icon
               [suiIconType]="suiHeaderIcon"></i>
            {{suiHeaderText}}
          </div>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class SuiModalComponent implements OnDestroy {
  @ViewChild('contentTemplate', {static: true}) public contentTemplate!: TemplateRef<any>;

  @Input() public suiHeaderText: string;
  @Input() public suiHeaderIcon: string;
  @Input() public suiSize: SuiModalSize = null;
  @Input() public suiScroll: SuiModalScrollability = 'none';
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiClosable = true;
  @Input() @InputBoolean() public suiCentered = true;
  @Input() @InputBoolean() public suiFullScreen = false;
  @Input() @InputBoolean() public suiMaskClosable = true;
  @Output() public visibleChange = new EventEmitter<boolean>();

  private readonly uniqueId: number;
  private _visible = false;
  private _modalDomRef: HTMLElement;

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

  get classes(): Array<string> {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiFullScreen, 'fullscreen'),
      this.scrollClass,
      'modal',
      'transition',
      'visible',
      'active'
    ];
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

  constructor(@Inject(DOCUMENT) private document, private renderer: Renderer2,
              private viewRef: ViewContainerRef) {
    this.uniqueId = Math.ceil(Math.random() * 100000000);
  }

  public ngOnDestroy(): void {
    const container = this.getModalFromDom();
    if (container) {
      this.renderer.removeChild(this.document.body, container);
    }
  }

  showModal(): void {
    if (!this.isModalInDom()) {
      this.generateDomElement();
    }

    // insert necessary classes to show the modal
    this.renderer.setProperty(this._modalDomRef, 'style', 'display: flex !important;');
    this.renderer.addClass(this._modalDomRef, 'visible');
    this.renderer.addClass(this._modalDomRef, 'active');
  }

  hideModal(): void {
    if (this._modalDomRef) {
      // remove necessary classes to hide the modal
      this.renderer.removeAttribute(this._modalDomRef, 'style');
      this.renderer.removeClass(this._modalDomRef, 'visible');
      this.renderer.removeClass(this._modalDomRef, 'active');
    }
  }

  private generateDomElement(): void {
    const container = this.renderer.createElement('div');
    this.renderer.setAttribute(container, 'id', this.uniqueId.toString());
    const containerStyle = 'ui dimmer modals page' + this.suiCentered ? '' : ' top aligned' + ' transition';
    this.renderer.setAttribute(container, 'class', containerStyle);

    // render the modal contents
    const content = this.viewRef.createEmbeddedView(this.contentTemplate);
    content.detectChanges();
    for (const node of content.rootNodes) {
      this.renderer.appendChild(container, node);
    }

    // set the class properties
    this._modalDomRef = container;

    // insert the generated html into the DOM
    this.renderer.appendChild(this.document.body, this._modalDomRef);
  }

  private isModalInDom(): boolean {
    return !!this.getModalFromDom();
  }

  private getModalFromDom(): HTMLElement {
    return this.document.getElementById(this.uniqueId);
  }
}
