import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../common';

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

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.getPropClass(this.suiOrdered, 'ordered'),
      this.getPropClass(this.suiVertical, 'vertical'),
      this.suiSize,
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
