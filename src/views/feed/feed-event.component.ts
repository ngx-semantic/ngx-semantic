/**
 * Created by bolor on 7/28/2020
 */

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: false,
  exportAs: 'suiFeedEvent',
  selector: '[suiFeedEvent]',
  template: `
    <ng-container *ngIf="hasLabel">
      <div class="label">
        <ng-container *ngIf="suiLabelIcon">
          <i class="{{suiLabelIcon}} icon"></i>
        </ng-container>
        <ng-container *ngIf="suiLabelImageUrl">
          <img [src]="suiLabelImageUrl" alt="Label image" />
        </ng-container>
      </div>
    </ng-container>

    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiFeedEventComponent {
  @Input() public suiLabelIcon: string | null = null;
  @Input() public suiLabelImageUrl: string | null = null;

  @HostBinding('class')
  get classes(): string {
    return 'event';
  }

  protected get hasLabel(): boolean {
    return !!this.suiLabelIcon || !!this.suiLabelImageUrl;
  }
}
