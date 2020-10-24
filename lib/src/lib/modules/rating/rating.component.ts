/**
 * Created by bolor on 10/24/2020
 */

import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiRatingType = 'star' | 'heart' | null;

@Component({
  selector: 'sui-rating',
  template: `
    <ng-container *ngFor="let i of ratingsArray">
      <i class="icon"
         [class.active]="i <= suiValue"
         [class.selected]="isHovered"
         (click)="onClick(i)"
         (mouseover)="onHover()"
         (mouseout)="onUnhover()"></i>
    </ng-container>
  `,
  styles: [`
    :host.read-only .icon {
      cursor: auto
    }
  `],
})
export class SuiRatingComponent {
  @Output() public valueChanged = new EventEmitter<number>();
  @Input() public suiSize: SuiSize = null;
  @Input() public suiType: SuiRatingType = null;
  @Input() public suiReadOnly = false;
  @Input() public suiClearable = false;

  private value = 0;
  private maxValue = 5;
  public ratingsArray = [];
  public isHovered = false;

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
      Utils.getPropClass(this.isHovered, 'selected'),
    ].joinWithWhitespaceCleanup();
  }

  @HostListener('mouseover')
  public hostMouseOver() {
    this.onHover();
  }

  @HostListener('mouseout')
  public hostMouseOut() {
    this.onUnhover();
  }

  public onClick(value): void {
    if (this.suiValue !== value) {
      if (this.suiClearable) {
        value = 0;
      }

      this.valueChanged.emit(value);
    }

    this.suiValue = value;
  }

  public onHover(): void {
    this.isHovered = !this.suiReadOnly && true;
  }

  public onUnhover(): void {
    this.isHovered = !this.suiReadOnly && false;
  }

  private generateRatingsArray(): void {
    this.ratingsArray = Array(this.maxValue)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
