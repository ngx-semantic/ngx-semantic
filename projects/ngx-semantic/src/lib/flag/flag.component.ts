import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: '[sui-flag]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFlagComponent {
  @Input() suiCountry = '';

  @HostBinding('class')
  get classes(): string {
    return [this.suiCountry, 'flag'].join((' '));
  }

  constructor() {
  }
}
