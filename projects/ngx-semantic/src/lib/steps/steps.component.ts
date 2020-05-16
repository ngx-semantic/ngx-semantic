import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'div[sui-steps]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'steps',
    ].join(' ');
  }
}
