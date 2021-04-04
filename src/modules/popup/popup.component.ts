/**
 * Created by bolorundurowb on 1/16/2021
 */

import {Component, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiPopupPlacement, SuiPopupWidth} from 'ngx-semantic/modules/popup/popup.directive';
import {SuiSize} from 'ngx-semantic/core/enums';

@Component({
  selector: 'sui-popup',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="position: unset !important;"
         [ngClass]="classes">
      <ng-container *ngIf="suiTitle">
        <div class="header">
          {{suiTitle}}
        </div>
      </ng-container>

      <div class="content">
        <ng-container *ngIf="isString">
          {{suiContent}}
        </ng-container>

        <ng-container *ngIf="isTemplate">
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styles: []
})
export class SuiPopupComponent {
  @Input() public suiPlacement: SuiPopupPlacement = 'top center';
  @Input() public suiWidth: SuiPopupWidth = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiTitle: string;
  @Input() public suiContent: string | TemplateRef<any>;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiFlowing = false;

  get classes(): Array<string> {
    return [
      'ui',
      this.suiWidth,
      this.suiSize,
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiFlowing, 'flowing'),
      'popup',
      this.suiPlacement,
      'transition',
      'visible'
    ].removeWhitespace();
  }

  get isString(): boolean {
    return typeof this.suiContent === 'string';
  }

  get isTemplate(): boolean {
    return this.suiContent instanceof TemplateRef;
  }
}
