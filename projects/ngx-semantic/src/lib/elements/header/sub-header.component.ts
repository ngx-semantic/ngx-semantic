/**
 * Created by bolor on 5/19/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-sub-header]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSubHeaderComponent {
  @HostBinding('class')
  get classes(): string {
    return 'sub header';
  }
}
