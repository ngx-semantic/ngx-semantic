/**
 * Created by bolor on 10/22/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, Utils} from '../../common';
import {InputBoolean} from "../../core/util";

export type SuiProgressAttachment = 'bottom' | 'top' | null;
export type SuiProgressState = 'success' | 'warning' | 'error' | null;

@Component({
  selector: 'sui-progress',
  template: `
    <div class="bar"
         [style.width.%]="progressPercentage">
      <ng-container *ngIf="suiShowProgress">
        <div class="progress">{{progressPercentage}}%</div>
      </ng-container>
    </div>
    <div class="label">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class SuiProgressComponent {
  @Input() public suiAttached: SuiProgressAttachment = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiState: SuiProgressState = null;
  @Input() @InputBoolean() public suiIndicating = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiShowProgress = true;

  private value = 0;
  private maxValue = 100;
  public progressPercentage: number;
  public isActive: boolean;

  @Input()
  set suiValue(value: number) {
    this.value = +value;
    this.calculatePercentage();
  }

  get suiValue(): number {
    return this.value;
  }

  @Input()
  set suiMaxValue(maxValue: number) {
    this.maxValue = +maxValue;
    this.calculatePercentage();
  }

  get suiMaxValue(): number {
    return this.maxValue;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiColour,
      this.suiAttached ? `${this.suiAttached} attached` : '',
      ClassUtils.getPropClass(this.isActive, 'active'),
      ClassUtils.getPropClass(this.suiIndicating, 'indicating'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'progress',
      this.suiState,
    ].joinWithWhitespaceCleanup();
  }

  private calculatePercentage(): void {
    if (this.value > this.maxValue) {
      return;
    }

    this.progressPercentage = Math.ceil(this.value * 100 / this.maxValue);
    this.isActive = this.progressPercentage < 100;

    if (this.progressPercentage === 100) {
      this.suiState = 'success';
    }
  }
}
