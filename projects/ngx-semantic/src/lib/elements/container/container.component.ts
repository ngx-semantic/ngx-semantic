/**
 * Created by bolor on 9/22/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-container]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiContainerComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'container'
    ].joinWithWhitespaceCleanup();
    '';
  }
}
