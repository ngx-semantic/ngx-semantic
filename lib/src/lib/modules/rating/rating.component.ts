/**
 * Created by bolor on 10/24/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiRatingType = 'star' | 'heart' | null;

@Component({
  selector: 'sui-rating',
  template: `
    <ng-container *ngFor="let rating of ratingsArray">
      <i class="icon"></i>
    </ng-container>
  `,
})
export class SuiRatingComponent {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiType: SuiRatingType = null;
  @Input() public suiReadOnly = false;

  private value = 0;
  private maxValue = 5;
  public ratingsArray = [];

  @Input()
  set suiValue(value: number) {
    this.value = +value;
  }

  get suiValue(): number {
    return this.value;
  }

  @Input()
  set suiMaxValue(maxValue: number) {
    this.maxValue = +maxValue;
    this.generateRatingsArray();
  }

  get suiMaxValue(): number {
    return this.maxValue;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.suiType,
      Utils.getPropClass(this.suiReadOnly, 'read-only'),
      'rating',
    ].joinWithWhitespaceCleanup();
  }

  private generateRatingsArray(): void {
    this.ratingsArray = Array(this.maxValue)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
