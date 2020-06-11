/**
 * Created by bolor on 6/11/2020
 */

import {Component, Host, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-grid]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiGridComponent {
  @HostBinding('class')
  get classes(): string {
    return ['ui', 'grid'].joinWithWhitespaceCleanup();
  }
}
