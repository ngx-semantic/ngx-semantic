/**
 * Created by bolor on 7/20/2020
 */

import {Component, Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[sui-comments]',
  exportAs: 'suiComments'
})
export class SuiCommentsDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiThreaded = false;
  @Input() @InputBoolean() public suiMinimal = false;
  @Input() @InputBoolean() public suiCollapsed = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiMinimal, 'minimal'),
      Utils.getPropClass(this.suiThreaded, 'threaded'),
      Utils.getPropClass(this.suiCollapsed, 'collapsed'),
      'comments'
    ].joinWithWhitespaceCleanup();
  }
}
