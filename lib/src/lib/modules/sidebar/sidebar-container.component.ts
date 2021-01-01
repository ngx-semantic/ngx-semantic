/**
 * Created by bolorundurowb on 1/1/2021
 */

import {AfterContentInit, Component, ContentChild} from '@angular/core';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';
import {SuiSidebarComponent} from './sidebar.component';

@Component({
  selector: 'sui-sidebar-container',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarContainerComponent implements AfterContentInit {
  @ContentChild(SuiSidebarComponent) public suiSidebar: SuiSidebarComponent;
  @ContentChild(SuiSidebarPusherComponent) public suiPusher: SuiSidebarPusherComponent;

  public ngAfterContentInit(): void {
    if (!this.suiSidebar) {
      throw new Error('You must include a <sui-sidebar> element within the container.');
    }

    if (!this.suiPusher) {
      throw new Error('You must include a <sui-sidebar-pusher> element within the container.');
    }

    this.suiSidebar.visibleChange
      .subscribe((isVisible) => {
        this.suiPusher = isVisible;
      });
  }
}
