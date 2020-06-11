/**
 * Created by bolor on 5/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize} from '../../common';

@Component({
  selector: '[sui-breadcrumb]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiBreadcrumbComponent {
  @Input() suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return ['ui', this.suiSize, 'breadcrumb'].joinWithWhitespaceCleanup();
  }
}
