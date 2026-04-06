/**
 * Created by bolor on 7/28/2020
 */

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  exportAs: 'suiFeedEvent',
  selector: '[suiFeedEvent]',
  template: `
    @if (hasLabel) {
      <div class="label">
        @if (suiLabelIcon) {
          <i class="{{suiLabelIcon}} icon"></i>
        }
        @if (suiLabelImageUrl) {
          <img [src]="suiLabelImageUrl" alt="Label image" />
        }
      </div>
    }

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
