/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  Component, EventEmitter, Inject, Input,
  OnDestroy, OnInit, Output, Renderer2,
  TemplateRef, ViewChild,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {DOCUMENT} from "@angular/common";

export type SuiModalSize = 'mini' | 'tiny' | 'small' | 'large' | null;

@Component({
  selector: 'sui-modal',
  encapsulation: ViewEncapsulation.None,
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
          <div
            [class.ui]="!!suiHeaderIcon"
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

  @Input() public suiSize: SuiModalSize = null;
  @Input() public suiHeaderText: string;
  @Input() public suiHeaderIcon: string;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiClosable: boolean;
  @Input() @InputBoolean() public suiScrollable = true;
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
      'modal',
      'transition',
      'visible',
      'active'
    ];
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

  private showModal(): void {
    const portal = new TemplatePortal(this.contentTemplate, this.vcr);
    this._overlayRef?.attach(portal);
  }

  public hideModal(): void {
    this._overlayRef?.detach();
  }
}
