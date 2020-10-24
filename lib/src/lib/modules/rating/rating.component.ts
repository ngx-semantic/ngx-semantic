/**
 * Created by bolor on 10/24/2020
 */

import {Component, Input} from '@angular/core';
import {SuiSize} from '../../common';

export type SuiRatingType = 'star' | 'heart' | null;

@Component({
  selector: 'sui-rating',
  template: `
  `
})
export class SuiRatingComponent {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiType: SuiRatingType = null;

  private value = 0;

  @Input()
  set suiValue(value: number) {
    this.value = +value;
  }

  get suiValue(): number {
    return this.value;
  }

  private maxValue = 1000;

  @Input()
  set suiMaxValue(maxValue: number) {
    this.maxValue = +maxValue;
  }

  get suiMaxValue(): number {
    return this.maxValue;
  }
}
