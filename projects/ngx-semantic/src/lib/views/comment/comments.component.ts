/**
 * Created by bolor on 7/20/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: '[sui-comments]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiCommentsComponent {
  @Input() suiThreaded = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiThreaded, 'threaded'),
      'comments'
    ].joinWithWhitespaceCleanup();
  }
}
