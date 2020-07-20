/**
 * Created by bolor on 7/20/2020
 */

import {Component, Host, HostBinding, Input, Optional} from '@angular/core';
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
  @Input() suiCollapsed = false;

  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiSize,
      Utils.getPropClass(this.suiMinimal, 'minimal'),
      Utils.getPropClass(this.suiThreaded, 'threaded'),
      Utils.getPropClass(this.suiCollapsed, 'collapsed'),
      'comments'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiCommentsComponent) {
    this.isChildComponent = !!parent;
  }
}
