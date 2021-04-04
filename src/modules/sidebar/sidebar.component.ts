/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiSidebarService} from './sidebar.service';

export type SuiSidebarPosition = 'top' | 'bottom' | 'left' | 'right';
export type SuiSidebarWidth = 'thin' | 'very thin' | 'wide' | 'very wide' | null;
export type SuiSidebarAnimation = 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide along' | 'slide out' | null;

@Component({
  selector: 'sui-sidebar, [sui-sidebar]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarComponent {
  @Input() public suiSidebarPosition: SuiSidebarPosition = 'left';
  @Input() public suiSidebarWidth: SuiSidebarWidth = null;
  @Input() public suiSidebarAnimation: SuiSidebarAnimation = null;
  @Input() @InputBoolean() public suiInverted = false;
  @Output() public visibleChange = new EventEmitter<boolean>();

  private _visible = true;

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(isVisible) {
    this._visible = isVisible;
    this.visibleChange.emit(this._visible);
    this.sidebarService.changeVisibility(this._visible);
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSidebarPosition,
      this.suiSidebarWidth,
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'sidebar',
      this.suiSidebarAnimation,
      Utils.getPropClass(this.visible, 'visible')
    ].joinWithWhitespaceCleanup();
  }

  constructor(private sidebarService: SuiSidebarService) {
    sidebarService.pusherClicked
      .subscribe(() => {
        // only close sidebar on pusher when the visibility is dynamic
        if (this.visibleChange.observers.length > 0) {
          this.visible = false;
        }
      });
  }
}
