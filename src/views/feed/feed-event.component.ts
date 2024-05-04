/**
 * Created by bolor on 7/28/2020
 */

import { Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  exportAs: 'suiFeedEvent',
  selector: '[suiFeedEvent]',
  template: `
    <ng-container *ngIf="hasLabel">
      <div class="label">
        <ng-container *ngIf="suiLabelIcon">
          <i class="{{suiLabelIcon}} icon"></i>
        </ng-container>
        <ng-container *ngIf="suiLabelImageUrl">
          <img [src]="suiLabelImageUrl"/>
        </ng-container>
      </div>
    </ng-container>

    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiFeedEventComponent {
  @Input() public suiLabelIcon?: string = null;
  @Input() public suiLabelImageUrl?: string = null;

  @HostBinding('class')
  get classes(): string {
    return 'event';
  }

  protected get hasLabel(): boolean {
    return !!this.suiLabelIcon || !!this.suiLabelImageUrl;
  }
}
