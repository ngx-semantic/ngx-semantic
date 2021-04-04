/**
 * Created by bolorundurowb on 1/1/2021
 */

import {AfterContentInit, Component, ContentChild, ViewEncapsulation} from '@angular/core';
import {SuiSidebarComponent} from 'ngx-semantic/modules/sidebar/sidebar.component';
import {SuiSidebarPusherComponent} from 'ngx-semantic/modules/sidebar/sidebar-pusher.component';

@Component({
  selector: 'sui-sidebar-container',
  encapsulation: ViewEncapsulation.None,
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
        this.suiPusher.isSidebarOpen = isVisible;
      });
  }
}
