/**
 * Created by bolor on 5/4/2020
 */

import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'div[sui-loader]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiLoaderComponent {
  @Input() suiText = false;
  @Input() suiIndeterminate = false;
  @Input() suiActive = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.getPropClass(this.suiIndeterminate, 'indeterminate'),
      this.getPropClass(this.suiText, 'text'),
      this.getPropClass(this.suiActive, 'active'),
      'loader'
    ].join(' ');
  }

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
