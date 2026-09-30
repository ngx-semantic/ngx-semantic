/**
 * Created by bolorundurowb on 1/1/2021
 */

import { AfterContentInit, Component, ContentChild, HostBinding, Input, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputBoolean } from 'ngx-semantic/core/util';
import { SuiSidebarComponent } from './sidebar.component';
import { SuiSidebarPusherComponent } from './sidebar-pusher.component';
import { SuiSidebarService } from './sidebar.service';

@Component({
  standalone: true,
  selector: 'sui-sidebar-container',
  encapsulation: ViewEncapsulation.None,
  // each container gets its own service so multiple sidebars on a page do not affect one another
  providers: [SuiSidebarService],
  host: {
    style: 'display: block'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarContainerComponent implements AfterContentInit, OnDestroy {
  private sidebarService = inject(SuiSidebarService);

  @ContentChild(SuiSidebarComponent) public suiSidebar!: SuiSidebarComponent;
  @ContentChild(SuiSidebarPusherComponent) public suiPusher!: SuiSidebarPusherComponent;

  /**
   * Makes the container the sidebar's context (Semantic UI `pushable`). The sidebar and dimmer are then
   * positioned inside the container rather than the viewport. Always applied when the pusher is dimmable,
   * since Semantic UI only renders the dimmer inside a pushable context.
   */
  @Input() @InputBoolean() public suiPushable = false;

  private subscription: Subscription | null = null;

  @HostBinding('class.pushable')
  get isPushable(): boolean {
    return this.suiPushable || !!this.suiPusher?.suiDimmable;
  }

  public ngAfterContentInit(): void {
    if (!this.suiSidebar) {
      throw new Error('You must include a <sui-sidebar> element within the container.');
    }

    if (!this.suiPusher) {
      throw new Error('You must include a <sui-sidebar-pusher> element within the container.');
    }

    // the sidebar reports its initial visibility before the pusher exists, so sync it once here
    this.suiPusher.isSidebarOpen = this.suiSidebar.visible;

    this.subscription = this.sidebarService.visibilityChanged
      .subscribe((isVisible) => {
        this.suiPusher.isSidebarOpen = isVisible;
      });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
