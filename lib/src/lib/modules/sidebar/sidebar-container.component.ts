/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: 'sui-sidebar-pusher',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarPusherComponent {
  @Input() public suiDimmable = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiDimmable, 'dimmed'),
      'pusher'
    ].joinWithWhitespaceCleanup();
  }
}
