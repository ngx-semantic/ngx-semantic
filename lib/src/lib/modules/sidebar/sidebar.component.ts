/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, ContentChild, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Utils} from '../../common';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';

export type SuiSidebarPosition = 'top' | 'bottom' | 'left' | 'right';
export type SuiSidebarWidth = 'thin' | 'very thin' | 'wide' | 'very wide' | null;
export type SuiSidebarAnimation = 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide along' | 'slide out' | null;

@Component({
  selector: 'sui-sidebar, [sui-sidebar]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarComponent {
  @ContentChild(SuiSidebarPusherComponent) public pusherChild: SuiSidebarPusherComponent;

  @Input() public suiSidebarPosition: SuiSidebarPosition = 'left';
  @Input() public suiSidebarWidth: SuiSidebarWidth = null;
  @Input() public suiSidebarAnimation: SuiSidebarAnimation = null;
  @Input() public suiInverted = false;
  @Output() public visibleChange = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  private _visible = true;

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(isVisible) {
    this._visible = isVisible;
    this.visibleChange.emit(this._visible);

    if (this.pusherChild) {
      this.pusherChild.isSidebarOpen = this._visible;
    }
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSidebarWidth,
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'sidebar',
      this.suiSidebarAnimation,
      Utils.getPropClass(this.visible, 'visible')
    ].joinWithWhitespaceCleanup();
  }
}
