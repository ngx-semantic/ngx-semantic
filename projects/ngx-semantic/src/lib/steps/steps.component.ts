import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'div[sui-steps]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @Input() suiOrdered = false;
  @Input() suiVertical = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.getPropClass(this.suiOrdered, 'ordered'),
      this.getPropClass(this.suiVertical, 'vertical'),
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
