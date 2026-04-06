/**
 * Created by bolorundurowb on 1/16/2021
 */

import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiSize } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';

import { SuiPopupPlacement, SuiPopupWidth } from './popup.directive';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sui-popup',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="position: unset !important;"
         [ngClass]="classes">
      @if (suiTitle) {
        <div class="header">
          {{ suiTitle }}
        </div>
      }

      <div class="content">
        @if (isString) {
          {{ suiContent }}
        }

        @if (isTemplate) {
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        }
      </div>
    </div>
  `,
  styleUrls: [ './styles/popup.component.scss' ]
})
export class SuiPopupComponent {
  @Input() public suiPlacement: SuiPopupPlacement | null = null;
  @Input() public suiWidth: SuiPopupWidth | null = null;
  @Input() public suiSize: SuiSize | null = null;
  @Input() public suiTitle: string | null = null;
  @Input() public suiContent: TemplateRef<any> | null = null;
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
