/**
 * Created by bolorundurowb on 1/22/2021
 */

import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiModalSize = 'mini' | 'tiny' | 'small' | 'large' | null;

@Component({
  selector: 'sui-modal',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <div style="position: unset !important;"
           [ngClass]="classes">
        <ng-container *ngIf="suiClosable">
          <i sui-icon
             suiIconType="close"
             (click)="visible = false;"></i>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styles: [`
    .backdrop {
      background-color: rgba(0, 0, 0, 0.85);
    }
  `]
})
export class SuiModalComponent implements OnInit, OnDestroy {
  @Input() public suiSize: SuiModalSize = null;
  @Input() @InputBoolean() public suiBasic: boolean;
  @Input() @InputBoolean() public suiClosable: boolean;
  @Input() @InputBoolean() public suiScrollable: boolean;
  @Input() @InputBoolean() public suiFullScreen: boolean;
  @Input() @InputBoolean() public suiMaskClosable: boolean;
  @Output() public visibleChange = new EventEmitter<boolean>();

  @ViewChild('contentTemplate', {static: true}) public contentTemplate!: TemplateRef<any>;

  private _visible = false;
  private _overlayRef!: OverlayRef;

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
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiFullScreen, 'fullscreen'),
      'active',
      'modal'
    ].joinWithWhitespaceCleanup();
  }

  constructor(private overlay: Overlay, private positionBuilder: OverlayPositionBuilder,
              private vcr: ViewContainerRef) {
  }

  public ngOnInit(): void {
    const scrollStrategy = this.overlay
      .scrollStrategies
      .noop();
    const positionStrategy = this.positionBuilder
      .global()
      .centerHorizontally()
      .centerVertically();

    this._overlayRef = this.overlay.create({
      positionStrategy, scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'backdrop'
    });

    this._overlayRef
      .backdropClick()
      .subscribe(() => {
        if (this.suiMaskClosable) {
          this.visible = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }

  private showModal(): void {
    const portal = new TemplatePortal(this.contentTemplate, this.vcr);
    this._overlayRef?.attach(portal);
  }

  public hideModal(): void {
    this._overlayRef?.detach();
  }
}
