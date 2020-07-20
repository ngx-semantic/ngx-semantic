/**
 * Created by bolor on 7/20/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

@Component({
  selector: '[sui-comments]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiCommentsComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiThreaded = false;
  @Input() suiMinimal = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiMinimal, 'minimal'),
      Utils.getPropClass(this.suiThreaded, 'threaded'),
      'comments'
    ].joinWithWhitespaceCleanup();
  }
}
