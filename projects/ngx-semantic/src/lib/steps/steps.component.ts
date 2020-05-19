import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../common';

export type suiAttachedPosition = 'top attached' | 'bottom attached' | 'attached' | null;

@Component({
  selector: 'div[sui-steps]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepsComponent {
  @Input() suiOrdered = false;
  @Input() suiVertical = false;
  @Input() suiSize: SuiSize = null;
  @Input() suiAttached: suiAttachedPosition = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.getPropClass(this.suiOrdered, 'ordered'),
      this.getPropClass(this.suiVertical, 'vertical'),
      this.suiSize,
      this.suiAttached,
      'steps',
    ].join(' ');
  }

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
