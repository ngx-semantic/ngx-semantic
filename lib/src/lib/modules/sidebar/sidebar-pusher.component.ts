/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {Utils} from '../../common';
import {SuiSidebarService} from './sidebar.service';

@Component({
  selector: 'sui-sidebar-pusher',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SuiSidebarPusherComponent implements OnInit {
  @Input() public suiDimmable = false;
  public isSidebarOpen = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.isSidebarOpen && this.suiDimmable, 'dimmed'),
      'pusher'
    ].joinWithWhitespaceCleanup();
  }

  constructor(private sidebarService: SuiSidebarService) {
  }

  public ngOnInit(): void {
    this.sidebarService.visibilityChanged
      .subscribe((isVisible) => {
        this.isSidebarOpen = isVisible;
      });
  }

  @HostListener('click')
  public onClick(): void {
    if (this.isSidebarOpen) {
      this.sidebarService.notifyPusherClicked();
    }
  }
}
