/**
 * Created by bolorundurowb on 1/16/2021
 */

import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { SuiSize } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';

import { SuiPopupPlacement, SuiPopupWidth } from './popup.directive';

@Component({
  selector: 'sui-popup',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="position: unset !important;"
         [ngClass]="classes">
      <ng-container *ngIf="suiTitle">
        <div class="header">
          {{ suiTitle }}
        </div>
      </ng-container>

      <div class="content">
        <ng-container *ngIf="isString">
          {{ suiContent }}
        </ng-container>

        <ng-container *ngIf="isTemplate">
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: [ './styles/popup.component.scss' ]
})
export class SuiPopupComponent {
  @Input() public suiPlacement: SuiPopupPlacement = 'top left';
  @Input() public suiWidth: SuiPopupWidth = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiTitle: string;
  @Input() public suiContent: string | TemplateRef<any>;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiFlowing = false;
  @Input() @InputBoolean() public suiBasic = false;

  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      this.suiSize,
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiFlowing, 'flowing'),
      'popup',
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      this.suiPlacement,
      'transition',
      'visible'
    ].join(' ');
  }

  get isString(): boolean {
    return typeof this.suiContent === 'string';
  }

  get isTemplate(): boolean {
    return this.suiContent instanceof TemplateRef;
  }
}
