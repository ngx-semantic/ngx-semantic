/**
 * Created by bolor on 7/28/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-feed]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFeedComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'feed'
    ].joinWithWhitespaceCleanup();
  }
}
