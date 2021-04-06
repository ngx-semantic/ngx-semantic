/**
 * Created by bolorundurowb on 12/30/2020
 */

import {Component, HostBinding, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiSidebarService} from './sidebar.service';

@Component({
  selector: 'sui-sidebar-pusher',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarPusherComponent implements OnInit {
  @Input() @InputBoolean() public suiDimmable = false;
  public isSidebarOpen = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.isSidebarOpen && this.suiDimmable, 'dimmed'),
      'pusher'
    ];
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
