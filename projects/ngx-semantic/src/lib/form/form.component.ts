/**
 * Created by bolor on 6/5/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-form]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFormComponent {
  @HostBinding('class')
  get classes(): string {
    return ['ui', 'form'].joinWithWhitespaceCleanup();
  }
}
