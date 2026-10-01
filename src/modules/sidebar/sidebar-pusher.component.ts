/**
 * Created by bolorundurowb on 12/30/2020
 */

import { Component, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiSidebarService } from './sidebar.service';
import { BaseDirective } from 'ngx-semantic/core/base';

@Component({
  standalone: true,
  selector: 'sui-sidebar-pusher',
  encapsulation: ViewEncapsulation.None,
  host: {
    style: 'display: block'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class SuiSidebarPusherComponent extends BaseDirective implements OnInit, OnDestroy {
  private sidebarService = inject(SuiSidebarService);

  @Input() @InputBoolean() public suiDimmable = false;
  public isSidebarOpen = false;

  private subscription: Subscription | null = null;

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.isSidebarOpen && this.suiDimmable, 'dimmed'),
      'pusher'
    ].join(' ').trim();
  }

  public ngOnInit(): void {
    this.isSidebarOpen = this.isSidebarOpen || this.sidebarService.isVisible;
    this.subscription = this.sidebarService.visibilityChanged
      .subscribe((isVisible) => {
        this.isSidebarOpen = isVisible;
      });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('click')
  public onClick(): void {
    if (this.isSidebarOpen) {
      this.sidebarService.notifyPusherClicked();
    }
  }
}
