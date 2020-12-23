/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {SuiMenuAttachment} from '../../collections/menu';
import {SuiTabComponent} from './tab.component';

export type SuiTabType = 'basic' | 'pointing' | 'secondary' | 'text' | null;

@Component({
  selector: 'sui-tabs',
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="tabs.length > 0">
      <div sui-menu
           [suiAttached]="suiAttached"
           [suiTabular]="isBasic"
           [suiSecondary]="isSecondary"
           [suiPointing]="isPointing"
           [suiText]="isText">
        <ng-container *ngFor="let tab of tabs; let i = index;">
          <div suiMenuItem
               [suiActive]="isTabSelected(i)"
               (click)="changeTab(i)">
            <ng-container *ngIf="tab.suiIcon">
              <i sui-icon
                 [suiIconType]="tab.suiIcon"></i>
            </ng-container>

            {{tab.suiTitle}}
          </div>
        </ng-container>
      </div>
      <div sui-segment
           suiAttached="bottom attached">
        <ng-container *ngTemplateOutlet="currentTab"></ng-container>
      </div>
    </ng-container>
  `
})
export class SuiTabsComponent {
  @ContentChildren(SuiTabComponent) public tabs: QueryList<SuiTabComponent> = new QueryList<SuiTabComponent>();

  @Input() public suiTabType: SuiTabType = 'basic';
  @Input() public suiAttached: SuiMenuAttachment = 'top';

  private selectedTabIndex = 0;

  get isSecondary(): boolean {
    return this.suiTabType === 'secondary';
  }

  get isBasic(): boolean {
    return this.suiTabType === 'basic';
  }

  get isPointing(): boolean {
    return this.suiTabType === 'pointing';
  }

  get isText(): boolean {
    return this.suiTabType === 'text';
  }

  get currentTab(): TemplateRef<any> {
    return this.tabs[this.selectedTabIndex].contentTemplate;
  }

  changeTab(index: number): void {
    this.selectedTabIndex = index;
  }

  isTabSelected(index: number): boolean {
    return this.selectedTabIndex === index;
  }
}
