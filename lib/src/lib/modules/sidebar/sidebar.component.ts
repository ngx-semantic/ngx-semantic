/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Utils} from '../../common';

export type SuiSidebarPosition = 'top' | 'bottom' | 'left' | 'right';
export type SuiSidebarWidth = 'thin' | 'very thin' | 'wide' | 'very wide' | null;

@Component({
  selector: 'sui-sidebar, [sui-sidebar]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarComponent {
  @Input() public suiSidebarPosition: SuiSidebarPosition = 'left';
  @Input() public suiSidebarWidth: SuiSidebarWidth = null;
  @Input() public visible = true;
  @Output() public visibleChange = new EventEmitter<boolean>();

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSidebarWidth,
      Utils.getPropClass(this.visible, 'visible'),
      'sidebar'
    ].joinWithWhitespaceCleanup();
  }
}
